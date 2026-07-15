import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  private urlFrontend(): string {
    return this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const url = `${this.urlFrontend()}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to: email,
      subject: 'MadaCare — Vérification de votre email',
      html: `
        <h2>Bienvenue sur MadaCare</h2>
        <p>Cliquez sur le lien ci-dessous pour vérifier votre email :</p>
        <a href="${url}" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">
          Vérifier mon email
        </a>
        <p>Ce lien expire dans 24h.</p>
      `,
    });
    this.logger.log(`Email de vérification envoyé à ${email}`);
  }

  async sendActivationEmail(
    email: string,
    motDePasse: string,
    token: string,
    nomHopital: string,
  ): Promise<void> {
    const url = `${this.urlFrontend()}/auth/activation?token=${token}`;
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to: email,
      subject: 'MadaCare — Activation de votre compte médecin',
      html: `
        <h2>Votre compte MadaCare a été créé</h2>
        <p><strong>${nomHopital}</strong> vous a rattaché à la plateforme MadaCare.</p>
        <p>Vos identifiants de connexion :</p>
        <ul>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Mot de passe temporaire :</strong> ${motDePasse}</li>
        </ul>
        <a href="${url}" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">
          Activer mon compte
        </a>
        <p>Ce lien expire dans 72h.</p>
      `,
    });
    this.logger.log(`Email d'activation envoyé à ${email}`);
  }

  async sendHopitalValidationEmail(
    email: string,
    nomHopital: string,
    statut: string,
    motif?: string,
  ): Promise<void> {
    const sujet =
      statut === 'VALIDE'
        ? 'MadaCare — Votre hôpital a été validé'
        : 'MadaCare — Statut de votre inscription';

    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to: email,
      subject: sujet,
      html: `
        <h2>${nomHopital}</h2>
        <p>Statut de votre inscription : <strong>${statut}</strong></p>
        ${motif ? `<p>Motif : ${motif}</p>` : ''}
        <p>Connectez-vous sur MadaCare pour plus d'informations.</p>
      `,
    });
    this.logger.log(`Email validation hôpital envoyé à ${email}`);
  }
}