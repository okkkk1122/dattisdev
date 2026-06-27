import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InboundEmailDto {
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  from: string;

  @IsArray()
  to: string[];

  @IsString()
  subject: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  receivedAt?: string;
}
