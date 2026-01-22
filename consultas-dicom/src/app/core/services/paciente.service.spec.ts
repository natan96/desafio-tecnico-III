import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/pacientes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacienteService],
    });
    service = TestBed.inject(PacienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de pacientes', () => {
      const mockResponse = {
        data: [
          {
            id: 1,
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
        expect(response.data[0].nome).toBe('João Silva');
        expect(response.meta.total).toBe(1);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&pageSize=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('deve lidar com página vazia', () => {
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
        expect(response.meta.total).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&pageSize=10`);
      req.flush(mockResponse);
    });
  });

  describe('search', () => {
    it('deve buscar pacientes por termo', () => {
      const mockResponse = {
        data: [
          {
            id: 1,
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
          },
        ],
        meta: {
          total: 1,
          currentPage: 1,
          lastPage: 1,
          perPage: 20,
          prev: null,
          next: null,
        },
      };

      service.search('João', 1, 20).subscribe((response) => {
        expect(response.data).toHaveLength(1);
        expect(response.data[0].nome).toContain('João');
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${apiUrl}/search` &&
          request.params.get('q') === 'João' &&
          request.params.get('page') === '1' &&
          request.params.get('pageSize') === '20',
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('deve lidar com busca sem resultados', () => {
      const mockResponse = {
        data: [],
        meta: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          perPage: 20,
          prev: null,
          next: null,
        },
      };

      service.search('inexistente', 1, 20).subscribe((response) => {
        expect(response.data).toHaveLength(0);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === `${apiUrl}/search` &&
          request.params.get('q') === 'inexistente' &&
          request.params.get('page') === '1' &&
          request.params.get('pageSize') === '20',
      );
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('deve criar um novo paciente', () => {
      const novoPaciente = new Paciente({
        nome: 'Maria Santos',
        documento: '98765432100',
        celular: '11987654321',
        dataNascimento: '1985-05-20',
        cep: '87654321',
        rua: 'Av Principal',
        numero: '456',
        bairro: 'Jardim',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
      });

      const mockResponse = { ...novoPaciente, id: 1 };

      service.create(novoPaciente).subscribe((response) => {
        expect(response.id).toBe(1);
        expect(response.nome).toBe(novoPaciente.nome);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novoPaciente);
      req.flush(mockResponse);
    });

    it('deve lidar com erro de documento duplicado', () => {
      const paciente = new Paciente({
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
      });

      service.create(paciente).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(409);
        },
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush({ message: 'Documento já cadastrado' }, { status: 409, statusText: 'Conflict' });
    });
  });

  describe('update', () => {
    it('deve atualizar um paciente existente', () => {
      const id = 1;
      const dadosAtualizados = {
        nome: 'João Silva Atualizado',
        celular: '11999999999',
      };

      const mockResponse = {
        id,
        nome: 'João Silva Atualizado',
        documento: '12345678901',
        celular: '11999999999',
        dataNascimento: '1990-01-15',
        cep: '12345678',
        rua: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
      };

      service.update(id, dadosAtualizados).subscribe((response) => {
        expect(response.nome).toBe(dadosAtualizados.nome);
        expect(response.celular).toBe(dadosAtualizados.celular);
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });
  });

  describe('findOne', () => {
    it('deve buscar um paciente por ID', () => {
      const mockPaciente = {
        id: 1,
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

      service.findOne(1).subscribe((response) => {
        expect(response.id).toBe(1);
        expect(response.nome).toBe('João Silva');
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPaciente);
    });

    it('deve lidar com paciente não encontrado', () => {
      service.findOne(999).subscribe({
        next: () => expect(true).toBe(false),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush({ message: 'Paciente não encontrado' }, { status: 404, statusText: 'Not Found' });
    });
  });
});
