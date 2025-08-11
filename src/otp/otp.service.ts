import { InjectModel } from "@nestjs/mongoose";
import { Otp, OtpDocument } from "./otp.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private mailerService: MailerService
  ) {}

  async generate(email: string): Promise<Otp> {
     console.log('generate OTP for email:', email); 
       if (!email) {
    throw new UnauthorizedException('Email manquant pour générer OTP');
  }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.otpModel.deleteMany({ email });

    const otp = new this.otpModel({
      email,
      code,
      expiresAt,
      attempts: 0,
      isUsed: false,
    });

    await otp.save();

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Votre code de vérification Jungle',
        text: `Voici votre code : ${code}`,
        html: `<p>Votre code de vérification est : <strong>${code}</strong></p>`,
      });

      console.log(`OTP envoyé à ${email} : ${code}`);
    } catch (err) {
      console.error('Erreur envoi email OTP :', err);
      throw new UnauthorizedException('Impossible d’envoyer le code');
    }

    return otp;
  }


  async verify(email: string, code: string): Promise<boolean> {
    const otp = await this.otpModel.findOne({ email: email, isUsed: false });

    if (!otp) return false;

    if (otp.attempts >= 5) return false;

    if (otp.expiresAt < new Date()) return false;

    if (otp.code !== code) {
      otp.attempts += 1;
      await otp.save();
      return false;
    }

    otp.isUsed = true;
    await otp.save();
    return true;
  }
}
