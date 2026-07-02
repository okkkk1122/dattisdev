import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { StorageService } from '../storage/storage.service';
import { ContactDto } from '../content/dto/content.dto';
import { InboundEmailDto } from './dto/inbound-email.dto';
import { SendEmailDto, SendTestEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly storage: StorageService) {}

  private getSmtpConfig() {
    const settings = this.storage.get('settings') as Record<string, string | number>;
    const env = (key: string, fallback = '') =>
      (process.env[key] as string | undefined) || fallback;

    return {
      host: (settings.smtpHost as string) || env('SMTP_HOST', 'haraka'),
      port: Number(settings.smtpPort || env('SMTP_PORT', '25')),
      user: (settings.smtpUser as string) || env('SMTP_USER'),
      pass: (settings.smtpPass as string) || env('SMTP_PASS'),
      from:
        (settings.smtpFrom as string) || env('SMTP_FROM', 'info@dattisdev.ir'),
      contactEmail:
        (settings.contactEmail as string) ||
        env('CONTACT_EMAIL', 'info@dattisdev.ir'),
      mailDomain:
        (settings.mailDomain as string) || env('MAIL_DOMAIN', 'dattisdev.ir'),
    };
  }

  private formatFromAddress(from: string, mailDomain: string) {
    const email = from.includes('@') ? from : `info@${mailDomain}`;
    return `"DattisDev" <${email}>`;
  }

  private buildMessageId(mailDomain: string) {
    const stamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 12);
    return `<${stamp}.${random}@${mailDomain}>`;
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

  private async deliverMail(options: {
    from: string;
    to: string | string[];
    cc?: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
    inReplyTo?: string;
  }) {
    const transporter = this.getTransporter();
    if (!transporter) {
      throw new BadRequestException('SMTP is not configured');
    }

    const { mailDomain } = this.getSmtpConfig();
    const fromAddress = this.formatFromAddress(options.from, mailDomain);
    const envelopeFrom = fromAddress.match(/<([^>]+)>/)?.[1] ?? options.from;

    await transporter.sendMail({
      from: fromAddress,
      to: options.to,
      cc: options.cc,
      subject: options.subject,
      text: options.text,
      html: options.html ?? options.text.replace(/\n/g, '<br/>'),
      replyTo: options.replyTo ?? envelopeFrom,
      inReplyTo: options.inReplyTo,
      messageId: this.buildMessageId(mailDomain),
      headers: {
        'X-Mailer': 'DattisDev Mail',
      },
    });
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
      await this.deliverMail({
        from,
        to: contactEmail,
        subject: `[DattisDev Contact] ${dto.subject}`,
        text: plainBody,
        html,
        replyTo: dto.email,
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

  async sendEmail(dto: SendEmailDto) {
    const { from } = this.getSmtpConfig();

    try {
      await this.deliverMail({
        from,
        to: dto.to,
        cc: dto.cc,
        subject: dto.subject,
        text: dto.body,
        replyTo: dto.replyTo,
        inReplyTo: dto.inReplyTo,
      });
    } catch (error) {
      const message = (error as Error).message || 'SMTP send failed';
      this.logger.error(`sendEmail failed: ${message}`);
      throw new BadRequestException(message);
    }

    const saved = await this.storage.addEmail({
      from,
      to: dto.cc ? [dto.to, dto.cc] : [dto.to],
      subject: dto.subject,
      body: dto.body,
      receivedAt: new Date().toISOString(),
      read: true,
      source: 'sent',
    });

    this.logger.log(`Outbound email sent to ${dto.to}: ${dto.subject}`);
    return { success: true, id: saved.id, message: 'Email sent successfully' };
  }

  async sendTestEmail(dto: SendTestEmailDto) {
    const { from, contactEmail } = this.getSmtpConfig();
    const to = dto.to || contactEmail;
    const now = new Date().toLocaleString('fa-IR');

    try {
      await this.deliverMail({
        from,
        to,
        subject: 'تست ایمیل DattisDev',
        text: [
          'این یک ایمیل تست از پنل مدیریت DattisDev است.',
          '',
          `زمان ارسال: ${now}`,
          `SMTP Host: ${this.getSmtpConfig().host}`,
          `دامنه: ${this.getSmtpConfig().mailDomain}`,
        ].join('\n'),
      });
    } catch (error) {
      const message = (error as Error).message || 'SMTP send failed';
      this.logger.error(`sendTestEmail failed: ${message}`);
      throw new BadRequestException(message);
    }

    return {
      success: true,
      message: `Test email sent to ${to}`,
      to,
    };
  }

  async receiveInboundEmail(dto: InboundEmailDto) {
    const expected =
      (this.storage.get('settings') as Record<string, string>).harakaInboundSecret ||
      process.env.HARAKA_INBOUND_SECRET ||
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

    const inbox = this.getInbox();
    const unread = inbox.filter((e) => !e.read && e.source !== 'sent').length;

    return {
      provider: 'haraka',
      smtpHost: cfg.host,
      smtpPort: cfg.port,
      smtpFrom: cfg.from,
      contactEmail: cfg.contactEmail,
      mailDomain: cfg.mailDomain,
      smtpOk,
      smtpMessage,
      inboxCount: inbox.length,
      unreadCount: unread,
      harakaPorts: {
        smtp: Number(process.env.HARAKA_PUBLIC_SMTP_PORT || 2525),
        submission: Number(process.env.HARAKA_PUBLIC_SUBMISSION_PORT || 2587),
      },
      mxHint: `MX @ → ${process.env.SERVER_IP || 'YOUR_SERVER_IP'} (port 25 or ${process.env.HARAKA_PUBLIC_SMTP_PORT || 2525})`,
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
