import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getDataSourceToken } from '@nestjs/typeorm';
import { seedSuperAdmin } from './seeds/super-admin.seed';
import { seedSpecialites } from './seeds/specialites.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.enableCors({
    origin: 'http://localhost:3002',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('MadaCare API')
    .setDescription('API REST de la plateforme de santé numérique MadaCare')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT',
    )
    .addTag('Auth', 'Authentification et gestion des comptes')
    .addTag('Hopital', 'Gestion des établissements de santé')
    .addTag('Super Admin', 'Supervision et validation de la plateforme')
    .addTag('Medecin', 'Gestion des médecins et agendas')
    .addTag('Rendez-vous', 'Prise et gestion des rendez-vous')
    .addTag('Dossier Medical', 'Dossier médical patient portable')
    .addTag('Consultation', 'Consultations et ordonnances')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Seeds — déclaration dataSource en premier
  const dataSource = app.get(getDataSourceToken());
  await seedSuperAdmin(dataSource);
  await seedSpecialites(dataSource);

  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 MadaCare API      : http://localhost:4000/api`);
  console.log(`📚 MadaCare Swagger  : http://localhost:4000/api/docs`);
}

bootstrap();