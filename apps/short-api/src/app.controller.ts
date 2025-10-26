import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(':hash')
  async redirect(@Param('hash') hash: string, @Res() res: Response) {
    const link = await this.appService.getLink(hash);
    res.redirect(link.url);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createLink(@Body() dto: CreateLinkDto) {
    return this.appService.createLink(dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  deleteLink(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteLink(id);
  }
}
