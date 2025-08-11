// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(email: string, code: string) {
    try {
      const info = await this.mailerService.sendMail({
        to: email,
        subject: 'Votre code de vérification',
        text: `Voici votre code de vérification : ${code}`,
        html: `<p>Voici votre code de vérification : <strong>${code}</strong></p>`,
      });

      console.log('Email envoyé :', info.messageId);
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email :', error);
    }
  }
}
