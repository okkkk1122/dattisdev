import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { StorageService } from '../storage/storage.service';
import { ContactDto } from '../content/dto/content.dto';
import { InboundEmailDto } from './dto/inbound-email.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly storage: StorageService) {}

  private getSmtpConfig() {
    const settings = this.storage.get('settings') as Record<string, string | number>;
    return {
      host: (process.env.SMTP_HOST as string) || (settings.smtpHost as string) || 'haraka',
      port: Number(process.env.SMTP_PORT || settings.smtpPort || 25),
      user: (settings.smtpUser as string) || process.env.SMTP_USER || '',
      pass: (settings.smtpPass as string) || process.env.SMTP_PASS || '',
      from:
        (settings.smtpFrom as string) || process.env.SMTP_FROM || 'info@dattisdev.com',
      contactEmail:
        (settings.contactEmail as string) ||
        process.env.CONTACT_EMAIL ||
        'info@dattisdev.com',
      mailDomain:
        (settings.mailDomain as string) || process.env.MAIL_DOMAIN || 'dattisdev.com',
    };
  }

  private getTransporter() {
    const { host, port, user, pass } = this.getSmtpConfig();
    if (!host) return null;

    const options: SMTPTransport.Options = {
      host,
      port,
      secure: port === 465,
      tls: { rejectUnauthorized: false },
    };

    if (user && pass) {
      options.auth = { user, pass };
    }

    return nodemailer.createTransport(options);
  }

  async sendContactEmail(dto: ContactDto) {
    const { from, contactEmail } = this.getSmtpConfig();
    const transporter = this.getTransporter();

    const html = `
      <h2>پیام جدید از فرم تماس - DattisDev</h2>
      <p><strong>نام:</strong> ${dto.name}</p>
      <p><strong>ایمیل:</strong> ${dto.email}</p>
      <p><strong>تلفن:</strong> ${dto.phone || '-'}</p>
      <p><strong>موضوع:</strong> ${dto.subject}</p>
      <p><strong>زبان:</strong> ${dto.locale || 'fa'}</p>
      <hr/>
      <p>${dto.message.replace(/\n/g, '<br/>')}</p>
    `;

    const plainBody = [
      `نام: ${dto.name}`,
      `ایمیل: ${dto.email}`,
      `تلفن: ${dto.phone || '-'}`,
      `موضوع: ${dto.subject}`,
      `زبان: ${dto.locale || 'fa'}`,
      '',
      dto.message,
    ].join('\n');

    if (!transporter) {
      await this.storage.addEmail({
        from: dto.email,
        to: [contactEmail],
        subject: `[Contact] ${dto.subject}`,
        body: plainBody,
        receivedAt: new Date().toISOString(),
        read: false,
        source: 'contact',
      });
      this.logger.warn(`SMTP unavailable — contact saved to inbox from ${dto.email}`);
      return {
        success: true,
        mode: 'inbox',
        message: 'Message saved to inbox',
      };
    }

    try {
      await transporter.sendMail({
        from,
        to: contactEmail,
        replyTo: dto.email,
        subject: `[DattisDev Contact] ${dto.subject}`,
        html,
        text: plainBody,
      });
      return { success: true, mode: 'sent', message: 'Email sent successfully' };
    } catch (error) {
      await this.storage.addEmail({
        from: dto.email,
        to: [contactEmail],
        subject: `[Contact] ${dto.subject}`,
        body: plainBody,
        receivedAt: new Date().toISOString(),
        read: false,
        source: 'contact',
      });
      this.logger.error(`SMTP send failed, saved to inbox: ${(error as Error).message}`);
      return {
        success: true,
        mode: 'inbox',
        message: 'SMTP failed — message saved to inbox',
      };
    }
  }

  async receiveInboundEmail(dto: InboundEmailDto) {
    const expected =
      process.env.HARAKA_INBOUND_SECRET ||
      (this.storage.get('settings') as Record<string, string>).harakaInboundSecret ||
      'change-me-inbound-secret';

    if (!dto.secret || dto.secret !== expected) {
      throw new UnauthorizedException('Invalid inbound secret');
    }

    const saved = await this.storage.addEmail({
      from: dto.from,
      to: dto.to,
      subject: dto.subject,
      body: dto.body,
      receivedAt: dto.receivedAt || new Date().toISOString(),
      read: false,
      source: 'haraka',
    });

    return { success: true, id: saved.id };
  }

  getInbox() {
    return this.storage.get('emails') ?? [];
  }

  async markRead(id: string, read: boolean) {
    return this.storage.markEmailRead(id, read);
  }

  async deleteEmail(id: string) {
    await this.storage.deleteEmail(id);
    return { success: true };
  }

  async getStatus() {
    const cfg = this.getSmtpConfig();
    const transporter = this.getTransporter();
    let smtpOk = false;
    let smtpMessage = 'SMTP not configured';

    if (transporter) {
      try {
        await transporter.verify();
        smtpOk = true;
        smtpMessage = `Connected to ${cfg.host}:${cfg.port}`;
      } catch (error) {
        smtpMessage = (error as Error).message;
      }
    }

    return {
      provider: 'haraka',
      smtpHost: cfg.host,
      smtpPort: cfg.port,
      mailDomain: cfg.mailDomain,
      smtpOk,
      smtpMessage,
      inboxCount: this.getInbox().length,
      harakaPorts: { smtp: 2525, submission: 2587 },
    };
  }

  async testConnection() {
    const status = await this.getStatus();
    if (!status.smtpOk) {
      return { success: false, message: status.smtpMessage };
    }
    return { success: true, message: status.smtpMessage };
  }
}
