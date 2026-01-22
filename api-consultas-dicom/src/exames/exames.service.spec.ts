import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ExamesService } from './exames.service';

describe('ExamesService', () => {
  let service: ExamesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    paciente: {
      findUnique: jest.fn(),
    },
    exame: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExamesService>(ExamesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createExameDto = {
      idempotencyKey: 'test-key-123',
      modalidade: 'CT' as any,
      dataExame: '2024-01-20T10:00:00',
      pacienteId: 1,
    };

    const mockPaciente = {
      id: 1,
      nome: 'João Silva',
      documento: '12345678901',
      celular: '11987654321',
      dataNascimento: new Date('1990-01-15'),
      dataCriacao: new Date(),
      cep: '12345678',
      rua: 'Rua Teste',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
    };

    const mockExame = {
      id: 1,
      idempotencyKey: 'test-key-123',
      modalidade: 'CT',
      dataExame: new Date('2024-01-20T10:00:00'),
      dataCriacao: new Date(),
      pacienteId: 1,
    };

    it('deve lançar BadRequestException se paciente não existir', async () => {
      mockPrismaService.paciente.findUnique.mockResolvedValue(null);

      await expect(service.create(createExameDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(createExameDto)).rejects.toThrow(
        'Paciente não encontrado',
      );
    });

    it('deve criar exame e retornar isNew: true quando bem-sucedido', async () => {
      mockPrismaService.paciente.findUnique.mockResolvedValue(mockPaciente);
      mockPrismaService.exame.create.mockResolvedValue(mockExame);

      const result = await service.create(createExameDto);

      expect(result).toEqual({ exame: mockExame, isNew: true });
      expect(mockPrismaService.exame.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          idempotencyKey: createExameDto.idempotencyKey,
          modalidade: createExameDto.modalidade,
          pacienteId: createExameDto.pacienteId,
        }),
      });
    });

    it('deve retornar exame existente com isNew: false em P2002 (duplicate key)', async () => {
      mockPrismaService.paciente.findUnique.mockResolvedValue(mockPaciente);
      mockPrismaService.exame.create.mockRejectedValue({ code: 'P2002' });
      mockPrismaService.exame.findUnique.mockResolvedValue(mockExame);

      const result = await service.create(createExameDto);

      expect(result).toEqual({ exame: mockExame, isNew: false });
      expect(mockPrismaService.exame.findUnique).toHaveBeenCalledWith({
        where: { idempotencyKey: createExameDto.idempotencyKey },
      });
    });

    it('deve fazer retry em caso de erro desconhecido do Prisma', async () => {
      mockPrismaService.paciente.findUnique.mockResolvedValue(mockPaciente);
      mockPrismaService.exame.create
        .mockRejectedValueOnce(new Error('Prisma ReferenceError'))
        .mockRejectedValueOnce(new Error('Prisma ReferenceError'))
        .mockResolvedValueOnce(mockExame);

      const result = await service.create(createExameDto);

      expect(result).toEqual({ exame: mockExame, isNew: true });
      expect(mockPrismaService.exame.create).toHaveBeenCalledTimes(3);
    });

    it('deve lançar BadRequestException em P2003 (FK violation)', async () => {
      mockPrismaService.paciente.findUnique.mockResolvedValue(mockPaciente);
      mockPrismaService.exame.create.mockRejectedValue({ code: 'P2003' });

      await expect(service.create(createExameDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.create(createExameDto)).rejects.toThrow(
        'Paciente não encontrado',
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de exames', async () => {
      const mockExames = [{ id: 1 }, { id: 2 }];
      mockPrismaService.exame.findMany.mockResolvedValue(mockExames);
      mockPrismaService.exame.count.mockResolvedValue(15);

      const result = await service.findAll({ page: 1, pageSize: 10 });

      expect(result.data).toEqual(mockExames);
      expect(result.meta).toEqual({
        total: 15,
        lastPage: 2,
        currentPage: 1,
        perPage: 10,
        prev: null,
        next: 2,
      });
    });
  });
});
