import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validerUtilisateur(
    email: string,
    motDePasse: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    if (!user.actif) return null;
    const motDePasseValide = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!motDePasseValide) return null;
    return user;
  }

  async genererTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    doitChangerMotDePasse: boolean;
  }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '24h' as const,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '30d' as const,
    });
    return {
      accessToken,
      refreshToken,
      doitChangerMotDePasse: user.doitChangerMotDePasse,
    };
  }

  async seConnecter(email: string, motDePasse: string) {
    const user = await this.validerUtilisateur(email, motDePasse);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    if (!user.emailVerifie) {
      throw new UnauthorizedException('Veuillez vérifier votre email');
    }
    return this.genererTokens(user);
  }

  async rafraichirToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.userService.findById(payload.sub);
      if (!user || !user.actif) {
        throw new UnauthorizedException('Token invalide');
      }
      return this.genererTokens(user);
    } catch {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }

  async verifierEmail(token: string): Promise<{ message: string }> {
    const user = await this.userService.findByTokenVerification(token);
    if (!user) {
      throw new BadRequestException('Lien de vérification invalide ou expiré');
    }
    await this.userService.update(user.id, {
      emailVerifie: true,
      tokenVerification: undefined,
    });
    return { message: 'Email vérifié avec succès. Vous pouvez vous connecter.' };
  }

  async hacherMotDePasse(motDePasse: string): Promise<string> {
    return bcrypt.hash(motDePasse, 10);
  }

  genererToken(): string {
    return (
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2)
    );
  }
}