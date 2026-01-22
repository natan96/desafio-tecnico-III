import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { PaginationDto } from 'src/database/pagination/pagination.dto';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { SearchPacienteDto } from './dto/search-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.pacientesService.findAll(pagination);
  }

  @Get('search')
  search(@Query() searchDto: SearchPacienteDto) {
    return this.pacientesService.search(searchDto.q || '', searchDto);
  }

  @Get('data')
  findByDate(@Query('data') data: string) {
    return this.pacientesService.findByDate(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pacientesService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(Number(id), updatePacienteDto);
  }
}
