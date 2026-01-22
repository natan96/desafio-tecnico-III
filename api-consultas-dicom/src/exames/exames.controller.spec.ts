import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ExamesController } from './exames.controller';
import { ExamesService } from './exames.service';

describe('ExamesController', () => {
  let controller: ExamesController;
  let service: ExamesService;

  const mockExamesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamesController],
      providers: [
        {
          provide: ExamesService,
          useValue: mockExamesService,
        },
      ],
    }).compile();

    controller = module.get<ExamesController>(ExamesController);
    service = module.get<ExamesService>(ExamesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createExameDto = {
      idempotencyKey: 'test-key',
      modalidade: 'CT' as any,
      dataExame: '2024-01-20',
      pacienteId: 1,
    };

    const mockExame = {
      id: 1,
      idempotencyKey: 'test-key',
      modalidade: 'CT',
      dataExame: new Date('2024-01-20'),
      dataCriacao: new Date(),
      pacienteId: 1,
    };

    it('deve retornar HTTP 201 quando exame é criado novo (isNew: true)', async () => {
      const res = mockResponse();
      mockExamesService.create.mockResolvedValue({
        exame: mockExame,
        isNew: true,
      });

      await controller.create(createExameDto, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockExame);
    });

    it('deve retornar HTTP 200 quando exame já existe (isNew: false)', async () => {
      const res = mockResponse();
      mockExamesService.create.mockResolvedValue({
        exame: mockExame,
        isNew: false,
      });

      await controller.create(createExameDto, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith(mockExame);
    });
  });
});
