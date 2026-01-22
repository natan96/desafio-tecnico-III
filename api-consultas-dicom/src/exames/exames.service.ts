import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/database/pagination/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { Exame } from './entities/exame.entity';

@Injectable()
export class ExamesService {
  // Map para controlar requisições em andamento por idempotencyKey
  private readonly pendingRequests = new Map<
    string,
    Promise<{ exame: any; isNew: boolean }>
  >();

  constructor(private prisma: PrismaService) {}

  async create(createExameDto: CreateExameDto) {
    const { idempotencyKey } = createExameDto;

    // Verificar se já existe uma requisição em andamento para esta idempotencyKey
    const existingRequest = this.pendingRequests.get(idempotencyKey);
    if (existingRequest) {
      // Retornar a mesma Promise que está sendo processada
      return existingRequest;
    }

    // Criar nova Promise e armazenar no Map
    const requestPromise = this.processCreate(createExameDto).finally(() => {
      // Remover do Map quando terminar (sucesso ou erro)
      this.pendingRequests.delete(idempotencyKey);
    });

    this.pendingRequests.set(idempotencyKey, requestPromise);
    return requestPromise;
  }

  private async processCreate(createExameDto: CreateExameDto) {
    // Validar se o paciente existe primeiro
    const pacienteExistente = await this.prisma.paciente.findUnique({
      where: { id: createExameDto.pacienteId },
    });

    if (!pacienteExistente) {
      throw new BadRequestException('Paciente não encontrado');
    }

    // Verificar se já existe um exame com essa idempotencyKey (SELECT primeiro)
    const exameExistente = await this.prisma.exame.findUnique({
      where: { idempotencyKey: createExameDto.idempotencyKey },
    });

    if (exameExistente) {
      // Já existe - retornar com isNew: false
      return { exame: exameExistente, isNew: false };
    }

    // Não existe - tentar criar
    try {
      const exame = await this.prisma.exame.create({
        data: createExameDto,
      });

      return { exame, isNew: true };
    } catch (error) {
      // Se for violação de unique constraint (race condition: outro request criou entre o SELECT e o CREATE)
      if (error?.code === 'P2002') {
        // Buscar o exame que foi criado pelo outro request
        const exameExistente = await this.prisma.exame.findUnique({
          where: { idempotencyKey: createExameDto.idempotencyKey },
        });

        if (exameExistente) {
          return { exame: exameExistente, isNew: false };
        }
      }

      // Se for violação de foreign key (P2003)
      if (error?.code === 'P2003') {
        throw new BadRequestException('Paciente não encontrado');
      }

      // Para outros erros, propagar
      throw error;
    }
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, pageSize = 10 } = pagination;

    const skip = (page - 1) * pageSize;

    const [data, total]: [Exame[], number] = await Promise.all([
      this.prisma.exame.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
        include: {
          paciente: true,
        },
      }),
      this.prisma.exame.count(),
    ]);

    const lastPage = Math.ceil(total / pageSize);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage: pageSize,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  }

  async findOne(id: number) {
    const exame = await this.prisma.exame.findUnique({
      where: { id },
    });

    if (!exame) {
      throw new NotFoundException(`Exame não encontrado.`);
    }

    return exame;
  }

  async findByIdempotencyKey(idempotencyKey: string) {
    return this.prisma.exame.findUnique({
      where: { idempotencyKey },
    });
  }

  async update(id: number, updateExameDto: UpdateExameDto) {
    const exame = await this.prisma.exame.findUnique({ where: { id } });

    if (!exame) {
      throw new NotFoundException(`Exame não encontrado.`);
    }

    // Se está tentando atualizar o paciente, validar se ele existe
    if (updateExameDto.pacienteId) {
      const pacienteExistente = await this.prisma.paciente.findUnique({
        where: { id: updateExameDto.pacienteId },
      });

      if (!pacienteExistente) {
        throw new BadRequestException('Paciente não encontrado');
      }
    }

    return this.prisma.exame.update({
      where: { id },
      data: updateExameDto,
    });
  }
}
