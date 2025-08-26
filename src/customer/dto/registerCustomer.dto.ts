import {
  IsNotEmpty,
  IsString,
  IsDate,
} from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class RegisterDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  phone: string;
 
}
