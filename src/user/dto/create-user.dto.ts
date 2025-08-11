import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  @IsString() first_name: string;
  @IsString() last_name:  string;
  @IsEmail()  email:      string;
  @IsString() password:   string;
  @IsString() phone?:      string;
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
