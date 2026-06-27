import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsString()
  locale?: string;
}

export class UpdateSettingsDto {
  @IsOptional() @IsString() siteName?: string;
  @IsOptional() @IsString() contactEmail?: string;
  @IsOptional() @IsString() contactPhone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() smtpHost?: string;
  @IsOptional() smtpPort?: number;
  @IsOptional() @IsString() smtpUser?: string;
  @IsOptional() @IsString() smtpPass?: string;
  @IsOptional() @IsString() smtpFrom?: string;
  @IsOptional() @IsString() mailDomain?: string;
  @IsOptional() @IsString() harakaInboundSecret?: string;
}
