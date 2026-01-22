import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { Exame } from '../models/exame.model';
import { ExameService } from './exame.service';

describe('ExameService', () => {
  let service: ExameService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/exames`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExameService],
    });
    service = TestBed.inject(ExameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('[Cenário 7] deve retornar lista paginada de exames com dados do paciente', () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            idempotencyKey: 'key-123',
            modalidade: 'CT',
            dataExame: '2024-01-20T10:30:00',
            pacienteId: 1,
            paciente: {
              id: 1,
              nome: 'João Silva',
              documento: '12345678901',
            },
          },
        ],
        meta: {
          total: 1,
          currentPage: 1,
          lastPage: 1,
          perPage: 10,
          prev: null,
          next: null,
        },
      };

      service.findAll(1, 10).subscribe((response) => {
        expect(response.data).toHaveLength(1);
        expect(response.data[0].modalidade).toBe('CT');
        expect(response.data[0].paciente).toBeDefined();
        expect(response.data[0].paciente?.nome).toBe('João Silva');
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&pageSize=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('deve lidar com lista vazia', () => {
      const mockResponse = {
        data: [],
        meta: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          perPage: 10,
          prev: null,
          next: null,
        },
      };

      service.findAll(1, 10).subscribe((response) => {
        expect(response.data).toHaveLength(0);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&pageSize=10`);
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('[Cenário 3] deve criar exame com idempotencyKey única', () => {
      const novoExame = new Exame({
        idempotencyKey: 'unique-key-789',
        modalidade: 'MR',
        dataExame: '2024-01-20T14:00:00',
        pacienteId: 1,
      });

      const mockResponse = { ...novoExame, id: 1 };

      service.create(novoExame).subscribe((response) => {
        expect(response.id).toBe(1);
        expect(response.modalidade).toBe('MR');
        expect(response.idempotencyKey).toBe('unique-key-789');
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novoExame);
      req.flush(mockResponse);
    });

    it('[Cenário 6] deve retornar erro 400 para paciente inexistente', () => {
      const exame = new Exame({
        idempotencyKey: 'key-invalid',
        modalidade: 'CT',
        dataExame: '2024-01-20T10:00:00',
        pacienteId: 99999,
      });

      service.create(exame).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.error.message).toContain('Paciente não encontrado');
        },
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush({ message: 'Paciente não encontrado' }, { status: 400, statusText: 'Bad Request' });
    });

    it('[Cenário 11] deve retornar erro 400 para modalidade inválida', () => {
      const exame = new Exame({
        idempotencyKey: 'key-invalid-modality',
        modalidade: 'INVALID' as any,
        dataExame: '2024-01-20T10:00:00',
        pacienteId: 1,
      });

      service.create(exame).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(400);
        },
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush({ message: 'Modalidade inválida' }, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('update', () => {
    it('deve atualizar um exame existente', () => {
      const id = 1;
      const dadosAtualizados = {
        modalidade: 'US',
        dataExame: '2024-01-21T09:00:00',
      };

      const mockResponse = {
        id,
        idempotencyKey: 'key-123',
        modalidade: 'US',
        dataExame: '2024-01-21T09:00:00',
        pacienteId: 1,
      };

      service.update(id, dadosAtualizados).subscribe((response) => {
        expect(response.modalidade).toBe('US');
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });
  });

  describe('findOne', () => {
    it('deve buscar um exame por ID', () => {
      const mockExame = {
        id: 1,
        idempotencyKey: 'key-123',
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30:00',
        pacienteId: 1,
      };

      service.findOne(1).subscribe((response) => {
        expect(response.id).toBe(1);
        expect(response.modalidade).toBe('CT');
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockExame);
    });

    it('deve lidar com exame não encontrado', () => {
      service.findOne(999).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush({ message: 'Exame não encontrado' }, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('[Cenário 10] Tratamento de erros de rede', () => {
    it('deve lidar com erro de rede no findAll', () => {
      service.findAll(1, 10).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(0);
        },
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&pageSize=10`);
      req.error(new ProgressEvent('Network error'));
    });

    it('deve lidar com timeout', () => {
      service
        .create(
          new Exame({
            idempotencyKey: 'timeout-key',
            modalidade: 'CT',
            dataExame: '2024-01-20T10:00:00',
            pacienteId: 1,
          }),
        )
        .subscribe({
          next: () => expect(true).toBe(false),
          error: (error) => {
            expect(error.status).toBe(0);
          },
        });

      const req = httpMock.expectOne(apiUrl);
      req.error(new ProgressEvent('timeout'));
    });
  });
});
