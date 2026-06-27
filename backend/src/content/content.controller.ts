import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { UpdateSettingsDto } from './dto/content.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all site content' })
  getAll() {
    return this.contentService.getAll();
  }

  @Get('posts')
  getPosts() {
    return this.contentService.getPosts();
  }

  @Put('posts')
  setPosts(@Body() body: unknown[]) {
    return this.contentService.setPosts(body);
  }

  @Get('portfolio')
  getPortfolio() {
    return this.contentService.getPortfolio();
  }

  @Put('portfolio')
  setPortfolio(@Body() body: unknown[]) {
    return this.contentService.setPortfolio(body);
  }

  @Get('testimonials')
  getTestimonials() {
    return this.contentService.getTestimonials();
  }

  @Put('testimonials')
  setTestimonials(@Body() body: unknown[]) {
    return this.contentService.setTestimonials(body);
  }

  @Get('pricing')
  getPricing() {
    return this.contentService.getPricing();
  }

  @Put('pricing')
  setPricing(@Body() body: unknown[]) {
    return this.contentService.setPricing(body);
  }

  @Get('faq')
  getFaq() {
    return this.contentService.getFaq();
  }

  @Put('faq')
  setFaq(@Body() body: unknown[]) {
    return this.contentService.setFaq(body);
  }

  @Get('settings')
  getSettings() {
    return this.contentService.getSettings();
  }

  @Put('settings')
  updateSettings(@Body() body: UpdateSettingsDto) {
    return this.contentService.updateSettings(body as Record<string, unknown>);
  }

  @Post('sync')
  syncAll(@Body() body: Record<string, unknown[]>) {
    return this.contentService.syncAll(body);
  }
}
