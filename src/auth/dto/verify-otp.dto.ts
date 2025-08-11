import { IsString, Length, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber('ZZ' as any, {
    message: 'Le numéro doit être au format international (ex: +33612345678)'
  })
  phone: string;

  @IsString()
  @Length(4, 6, {
    message: 'Le code OTP doit contenir entre 4 et 6 caractères'
  })
  otp: string;
}