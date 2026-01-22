import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { ExamesModule } from './exames/exames.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PacientesModule, ExamesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
