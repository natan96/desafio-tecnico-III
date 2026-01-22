import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService, PrismaService],
})
export class PacientesModule {}
