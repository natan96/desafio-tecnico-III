import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { PaginationDto } from 'src/database/pagination/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto) {
    // Verificar se já existe paciente com este documento
    const existente = await this.prisma.paciente.findUnique({
      where: { documento: createPacienteDto.documento },
    });

    if (existente) {
      throw new ConflictException(
        'Paciente com este documento CPF já cadastrado.',
      );
    }

    // Criar novo paciente
    return await this.prisma.paciente.create({
      data: createPacienteDto,
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, pageSize = 10 } = pagination;

    const skip = (page - 1) * pageSize;

    const [data, total]: [Paciente[], number] = await Promise.all([
      this.prisma.paciente.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'desc' },
      }),
      this.prisma.paciente.count(),
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

  async search(query: string = '', pagination: PaginationDto) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const whereClause = query?.trim()
      ? {
          OR: [
            { nome: { contains: query.trim() } },
            { documento: { contains: query.trim() } },
          ],
        }
      : {};

    const [data, total]: [Paciente[], number] = await Promise.all([
      this.prisma.paciente.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { nome: 'asc' },
      }),
      this.prisma.paciente.count({ where: whereClause }),
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

  async findByDate(dataString: string) {
    const data = parseISO(dataString);
    const inicioDoDia = startOfDay(data);
    const fimDoDia = endOfDay(data);

    return this.prisma.paciente.findMany({
      where: {
        exames: {
          some: {
            dataExame: {
              gte: inicioDoDia,
              lte: fimDoDia,
            },
          },
        },
      },
      include: {
        exames: {
          where: {
            dataExame: {
              gte: inicioDoDia,
              lte: fimDoDia,
            },
          },
          orderBy: { dataExame: 'asc' },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
      include: { exames: true },
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente não encontrado.`);
    }

    return paciente;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id },
      include: { exames: true },
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente não encontrado.`);
    }

    const updatedPaciente = this.prisma.paciente.update({
      where: { id },
      data: { ...updatePacienteDto },
    });
    return updatedPaciente;
  }
}
