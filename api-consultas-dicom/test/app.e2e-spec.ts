import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

// Aumentar timeout para testes de longa duração
jest.setTimeout(30000);

describe('API E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Limpar banco de dados antes de cada teste
    await prisma.exame.deleteMany();
    await prisma.paciente.deleteMany();
  });

  describe('Pacientes', () => {
    describe('POST /pacientes', () => {
      it('[Cenário 1] deve criar paciente com dados válidos', async () => {
        const pacienteData = {
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

        const response = await request(app.getHttpServer())
          .post('/pacientes')
          .send(pacienteData)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(pacienteData.nome);
        expect(response.body.documento).toBe(pacienteData.documento);
      });

      it('[Cenário 2] deve retornar erro 409 para CPF já existente', async () => {
        const pacienteData = {
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

        // Criar primeiro paciente
        await request(app.getHttpServer())
          .post('/pacientes')
          .send(pacienteData)
          .expect(201);

        // Tentar criar com mesmo documento
        const response = await request(app.getHttpServer())
          .post('/pacientes')
          .send({ ...pacienteData, nome: 'Maria Silva' })
          .expect(409);

        expect(response.body.message).toContain('documento');
      });

      it('deve validar campos obrigatórios', async () => {
        const response = await request(app.getHttpServer())
          .post('/pacientes')
          .send({ nome: 'João Silva' })
          .expect(400);

        expect(response.body.message).toBeInstanceOf(Array);
      });
    });

    describe('GET /pacientes', () => {
      it('[Cenário 8] deve listar pacientes com paginação', async () => {
        // Criar múltiplos pacientes via API HTTP
        for (let i = 0; i < 15; i++) {
          const pacienteData = {
            nome: `Paciente ${i}`,
            documento: `123456789${String(i).padStart(2, '0')}`,
            celular: '11987654321',
            dataNascimento: '1990-01-15',
            cep: '12345678',
            rua: 'Rua Teste',
            numero: '123',
            bairro: 'Centro',
            cidade: 'São Paulo',
            uf: 'SP',
          };

          await request(app.getHttpServer())
            .post('/pacientes')
            .send(pacienteData)
            .expect(201);
        }

        const response = await request(app.getHttpServer())
          .get('/pacientes?page=1&pageSize=10')
          .expect(200);

        expect(response.body.data).toHaveLength(10);
        expect(response.body.meta).toHaveProperty('total', 15);
        expect(response.body.meta).toHaveProperty('currentPage', 1);
        expect(response.body.meta).toHaveProperty('lastPage', 2);
      });

      it('deve retornar página vazia quando não há dados', async () => {
        const response = await request(app.getHttpServer())
          .get('/pacientes?page=1&pageSize=10')
          .expect(200);

        expect(response.body.data).toHaveLength(0);
        expect(response.body.meta.total).toBe(0);
      });
    });
  });

  describe('Exames', () => {
    let pacienteId: number;

    beforeEach(async () => {
      // Criar paciente para os testes de exame
      const paciente = await prisma.paciente.create({
        data: {
          nome: 'João Silva',
          documento: '11111111111', // Documento diferente para evitar conflito com outros testes
          celular: '11987654321',
          dataNascimento: '1990-01-15T00:00:00.000Z',
          cep: '12345678',
          rua: 'Rua Teste',
          numero: '123',
          bairro: 'Centro',
          cidade: 'São Paulo',
          uf: 'SP',
        },
      });
      pacienteId = paciente.id;
    });

    describe('POST /exames', () => {
      it('[Cenário 3] deve criar exame com paciente existente e idempotencyKey nova', async () => {
        const exameData = {
          idempotencyKey: 'unique-key-123',
          modalidade: 'CT',
          dataExame: '2026-02-20T10:30:00',
          pacienteId,
        };

        const response = await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.modalidade).toBe(exameData.modalidade);
        expect(response.body.idempotencyKey).toBe(exameData.idempotencyKey);
      });

      it('[Cenário 4] deve retornar HTTP 200 ao reenviar exame com mesma idempotencyKey', async () => {
        const exameData = {
          idempotencyKey: 'duplicate-key-456',
          modalidade: 'MR',
          dataExame: '2026-02-20T14:00:00',
          pacienteId,
        };

        // Primeira requisição - deve retornar 201 (criado)
        const firstResponse = await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(201);

        // Segunda requisição com mesma idempotencyKey
        // Deve retornar 200 (já existe) e o mesmo exame (idempotência)
        const secondResponse = await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(200);

        // Verificar que é o mesmo exame
        expect(secondResponse.body.id).toBe(firstResponse.body.id);
        expect(secondResponse.body.idempotencyKey).toBe(
          exameData.idempotencyKey,
        );
      });

      it('[Cenário 5] deve persistir apenas um exame em requisições simultâneas com mesma idempotencyKey', async () => {
        const exameData = {
          idempotencyKey: 'concurrent-key-789',
          modalidade: 'CT',
          dataExame: '2026-02-20T16:00:00',
          pacienteId,
        };

        // Executar múltiplas requisições simultaneamente
        const promises = Array(5)
          .fill(null)
          .map(() =>
            request(app.getHttpServer()).post('/exames').send(exameData),
          );

        const responses = await Promise.all(promises);

        // Verificar que todas retornaram sucesso (200 ou 201)
        responses.forEach((response) => {
          expect([200, 201]).toContain(response.status);
        });

        // Verificar que apenas um exame foi criado no banco
        const examesCount = await prisma.exame.count({
          where: { idempotencyKey: exameData.idempotencyKey },
        });
        expect(examesCount).toBe(1);

        // Verificar que todos retornaram o mesmo ID (mesmo exame)
        const ids = responses.map((r) => r.body.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(1);
      });

      it('[Cenário 6] deve retornar erro 400 para paciente inexistente', async () => {
        const exameData = {
          idempotencyKey: 'invalid-patient-key',
          modalidade: 'XA',
          dataExame: '2026-02-20T11:00:00',
          pacienteId: 99999,
        };

        const response = await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(400);

        expect(response.body.message).toContain('Paciente não encontrado');
      });

      it('[Cenário 11] deve retornar erro 400 para modalidade inválida', async () => {
        const exameData = {
          idempotencyKey: 'invalid-modality-key',
          modalidade: 'INVALID',
          dataExame: '2026-02-20T12:00:00',
          pacienteId,
        };

        await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(400);
      });

      it('deve validar campos obrigatórios', async () => {
        const response = await request(app.getHttpServer())
          .post('/exames')
          .send({ modalidade: 'CT' })
          .expect(400);

        expect(response.body.message).toBeInstanceOf(Array);
      });
    });

    describe('GET /exames', () => {
      it('[Cenário 7] deve listar exames com paginação (10 por página)', async () => {
        // Criar 15 exames via API HTTP
        for (let i = 0; i < 15; i++) {
          const exameData = {
            idempotencyKey: `key-${i}`,
            modalidade: 'CT',
            dataExame: '2026-02-20T10:00:00',
            pacienteId,
          };

          await request(app.getHttpServer())
            .post('/exames')
            .send(exameData)
            .expect(201);
        }

        const response = await request(app.getHttpServer())
          .get('/exames?page=1&pageSize=10')
          .expect(200);

        expect(response.body.data).toHaveLength(10);
        expect(response.body.meta).toHaveProperty('total', 15);
        expect(response.body.meta).toHaveProperty('currentPage', 1);
        expect(response.body.meta).toHaveProperty('lastPage', 2);
      });

      it('deve incluir dados do paciente nos exames listados', async () => {
        await prisma.exame.create({
          data: {
            idempotencyKey: 'test-key',
            modalidade: 'MR',
            dataExame: '2026-02-20T10:00:00.000Z',
            pacienteId,
          },
        });

        const response = await request(app.getHttpServer())
          .get('/exames')
          .expect(200);

        expect(response.body.data[0]).toHaveProperty('paciente');
        expect(response.body.data[0].paciente).toHaveProperty('nome');
        expect(response.body.data[0].paciente).toHaveProperty('documento');
      });
    });

    describe('Fluxo completo', () => {
      it('deve criar paciente e vincular exame corretamente', async () => {
        // 1. Criar paciente
        const pacienteData = {
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
        };

        const pacienteResponse = await request(app.getHttpServer())
          .post('/pacientes')
          .send(pacienteData)
          .expect(201);

        const novoPacienteId = pacienteResponse.body.id;

        // 2. Criar exame para o paciente
        const exameData = {
          idempotencyKey: 'flow-test-key',
          modalidade: 'US',
          dataExame: '2026-02-21T09:00:00',
          pacienteId: novoPacienteId,
        };

        const exameResponse = await request(app.getHttpServer())
          .post('/exames')
          .send(exameData)
          .expect(201);

        expect(exameResponse.body.pacienteId).toBe(novoPacienteId);

        // 3. Buscar exames do paciente
        const examesResponse = await request(app.getHttpServer())
          .get('/exames')
          .expect(200);

        const exameDoPaciente = examesResponse.body.data.find(
          (e: any) => e.pacienteId === novoPacienteId,
        );

        expect(exameDoPaciente).toBeDefined();
        expect(exameDoPaciente.paciente.nome).toBe(pacienteData.nome);
      });
    });
  });
});
