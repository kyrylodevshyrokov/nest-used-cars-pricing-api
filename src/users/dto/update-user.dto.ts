import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
