import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PacientesService } from './pacientes.service';

describe('PacientesService', () => {
  let service: PacientesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    paciente: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacientesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PacientesService>(PacientesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createPacienteDto = {
      nome: 'João Silva',
      documento: '12345678901',
      celular: '11987654321',
      dataNascimento: '1990-01-15',
      cep: '12345678',
      rua: 'Rua Teste',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
    };

    const mockPaciente = {
      id: 1,
      ...createPacienteDto,
      dataNascimento: new Date(createPacienteDto.dataNascimento),
      dataCriacao: new Date(),
    };

    it('deve criar paciente com sucesso', async () => {
      mockPrismaService.paciente.create.mockResolvedValue(mockPaciente);

      const result = await service.create(createPacienteDto);

      expect(result).toEqual(mockPaciente);
      expect(mockPrismaService.paciente.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          nome: createPacienteDto.nome,
          documento: createPacienteDto.documento,
        }),
      });
    });

    it('deve lançar ConflictException para CPF duplicado (P2002)', async () => {
      mockPrismaService.paciente.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createPacienteDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createPacienteDto)).rejects.toThrow(
        'Paciente com este documento CPF já cadastrado',
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de pacientes', async () => {
      const mockPacientes = [{ id: 1 }, { id: 2 }];
      mockPrismaService.paciente.findMany.mockResolvedValue(mockPacientes);
      mockPrismaService.paciente.count.mockResolvedValue(15);

      const result = await service.findAll({ page: 1, pageSize: 10 });

      expect(result.data).toEqual(mockPacientes);
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
