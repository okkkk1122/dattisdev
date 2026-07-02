import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { ContactDto } from '../content/dto/content.dto';
import { InboundEmailDto } from './dto/inbound-email.dto';
import { SendEmailDto, SendTestEmailDto } from './dto/send-email.dto';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  @ApiOperation({ summary: 'Send contact form email' })
  sendContact(@Body() dto: ContactDto) {
    return this.emailService.sendContactEmail(dto);
  }

  @Post('inbound')
  @ApiOperation({ summary: 'Haraka inbound webhook' })
  receiveInbound(@Body() dto: InboundEmailDto) {
    return this.emailService.receiveInboundEmail(dto);
  }

  @Get('inbox')
  @ApiOperation({ summary: 'List inbox emails' })
  getInbox() {
    return this.emailService.getInbox();
  }

  @Patch('inbox/:id/read')
  @ApiOperation({ summary: 'Mark email read/unread' })
  markRead(@Param('id') id: string, @Body('read') read: boolean) {
    return this.emailService.markRead(id, read !== false);
  }

  @Delete('inbox/:id')
  @ApiOperation({ summary: 'Delete inbox email' })
  deleteEmail(@Param('id') id: string) {
    return this.emailService.deleteEmail(id);
  }

  @Get('status')
  @ApiOperation({ summary: 'Haraka / SMTP status' })
  getStatus() {
    return this.emailService.getStatus();
  }

  @Post('test')
  @ApiOperation({ summary: 'Test SMTP connection' })
  testConnection() {
    return this.emailService.testConnection();
  }

  @Post('send')
  @ApiOperation({ summary: 'Send email from admin' })
  sendEmail(@Body() dto: SendEmailDto) {
    return this.emailService.sendEmail(dto);
  }

  @Post('test-send')
  @ApiOperation({ summary: 'Send test email' })
  sendTestEmail(@Body() dto: SendTestEmailDto) {
    return this.emailService.sendTestEmail(dto);
  }
}
