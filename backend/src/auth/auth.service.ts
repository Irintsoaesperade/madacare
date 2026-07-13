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

  // Valider email + mot de passe
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

  // Générer access token + refresh token
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
  // Connexion
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

  // Rafraîchir le token
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

  // Hacher un mot de passe
  async hacherMotDePasse(motDePasse: string): Promise<string> {
    return bcrypt.hash(motDePasse, 10);
  }
  async activerCompteMedecin(
  token: string,
  nouveauMotDePasse: string,
): Promise<{ message: string }> {
  const userTrouve = await this.userService.findByTokenActivation(token);

  if (!userTrouve) {
    throw new UnauthorizedException('Token d\'activation invalide');
  }

  if (
    userTrouve.tokenActivationExpire &&
    new Date() > userTrouve.tokenActivationExpire
  ) {
    throw new UnauthorizedException('Token d\'activation expiré');
  }

  const motDePasseHache = await this.hacherMotDePasse(nouveauMotDePasse);
  await this.userService.update(userTrouve.id, {
    motDePasse: motDePasseHache,
    emailVerifie: true,
    actif: true,
    tokenActivation: null,
    tokenActivationExpire: null,
    doitChangerMotDePasse: false,
  });

  return {
    message: 'Compte activé avec succès. Vous pouvez maintenant vous connecter.',
  };
}

  // Générer un token aléatoire
  genererToken(): string {
    return (
      Math.random().toString(36).substring(2) +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2)
    );
  }
}