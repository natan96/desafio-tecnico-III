import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExamesController } from './exames.controller';
import { ExamesService } from './exames.service';

@Module({
  controllers: [ExamesController],
  providers: [ExamesService, PrismaService],
})
export class ExamesModule {}
