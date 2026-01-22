import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginationDto } from 'src/database/pagination/pagination.dto';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { ExamesService } from './exames.service';

@Controller('exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Post()
  async create(@Body() createExameDto: CreateExameDto, @Res() res: Response) {
    const result = await this.examesService.create(createExameDto);
    const statusCode = result.isNew ? HttpStatus.CREATED : HttpStatus.OK;
    return res.status(statusCode).json(result.exame);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.examesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.examesService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExameDto: UpdateExameDto) {
    return this.examesService.update(Number(id), updateExameDto);
  }
}
