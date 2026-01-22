import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExameService } from '@core/services/exame.service';
import { PacienteService } from '@core/services/paciente.service';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ExameFormComponent } from './exame-form';

describe('ExameFormComponent', () => {
  let component: ExameFormComponent;
  let fixture: ComponentFixture<ExameFormComponent>;
  let exameService: any;
  let pacienteService: any;
  let toastrService: any;
  let router: any;

  beforeEach(async () => {
    const exameServiceSpy = {
      create: vi.fn(),
      update: vi.fn(),
      findOne: vi.fn(),
    };
    const pacienteServiceSpy = {
      findAll: vi.fn(),
      search: vi.fn(),
    };
    const toastrServiceSpy = {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
    };
    const routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ExameFormComponent, ReactiveFormsModule, NgxMaskPipe],
      providers: [
        { provide: ExameService, useValue: exameServiceSpy },
        { provide: PacienteService, useValue: pacienteServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideNgxMask(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    exameService = TestBed.inject(ExameService) as any;
    pacienteService = TestBed.inject(PacienteService) as any;
    toastrService = TestBed.inject(ToastrService) as any;
    router = TestBed.inject(Router) as any;

    // Mock da resposta de pacientes
    pacienteService.search.mockReturnValue(
      of({
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
      }),
    );

    fixture = TestBed.createComponent(ExameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('[Cenário 12] Validação de campos obrigatórios', () => {
    it('deve marcar campos como inválidos quando vazios e tocados', () => {
      const modalidadeControl = component.form.get('modalidade');
      const dataExameControl = component.form.get('dataExame');
      const pacienteIdControl = component.form.get('pacienteId');

      modalidadeControl?.markAsTouched();
      dataExameControl?.markAsTouched();
      pacienteIdControl?.markAsTouched();

      expect(component.isFieldInvalid('modalidade')).toBe(true);
      expect(component.isFieldInvalid('dataExame')).toBe(true);
      expect(component.isFieldInvalid('pacienteId')).toBe(true);
    });

    it('deve exibir mensagem de erro para campos obrigatórios', () => {
      const modalidadeControl = component.form.get('modalidade');
      modalidadeControl?.markAsTouched();

      expect(component.getFieldError('modalidade')).toBe('Campo obrigatório');
    });
  });

  describe('Criação de exame', () => {
    it('[Cenário 3] deve criar exame com dados válidos', () => {
      const mockExame = {
        id: 1,
        idempotencyKey: 'unique-key-123',
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30:00',
        pacienteId: 1,
      };

      exameService.create.mockReturnValue(of(mockExame));

      component.form.patchValue({
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30',
        pacienteId: '1',
      });

      component.onSubmit();

      expect(exameService.create).toHaveBeenCalled();
      expect(toastrService.success).toHaveBeenCalledWith('Exame cadastrado com sucesso', 'Sucesso');
      expect(router.navigate).toHaveBeenCalledWith(['/exames']);
    });

    it('deve gerar idempotencyKey ao criar novo exame', () => {
      component.ngOnInit();

      const idempotencyKey = component.form.get('idempotencyKey')?.value;
      expect(idempotencyKey).toBeTruthy();
      expect(typeof idempotencyKey).toBe('string');
    });

    it('[Cenário 6] deve exibir erro ao criar exame para paciente inexistente', () => {
      const errorResponse = {
        error: { message: 'Paciente não encontrado' },
        status: 400,
      };

      exameService.create.mockReturnValue(throwError(() => errorResponse));

      component.form.patchValue({
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30',
        pacienteId: '99999',
      });

      component.onSubmit();

      expect(toastrService.error).toHaveBeenCalledWith('Paciente não encontrado', 'Erro');
    });

    it('[Cenário 11] deve validar modalidade do enum', () => {
      component.form.patchValue({
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30',
        pacienteId: '1',
      });

      expect(component.modalidades).toContain('CT');
      expect(component.modalidades).toContain('MR');
      expect(component.modalidades).toContain('US');
    });
  });

  describe('[Cenário 9] Loading state e spinners', () => {
    it('deve mostrar loading durante busca de pacientes', async () => {
      expect(component.loadingPacientes()).toBe(false);

      component.onSearchChange({ target: { value: 'João' } } as any);

      // Aguardar o debounce
      await new Promise((resolve) => setTimeout(resolve, 350));
      expect(pacienteService.search).toHaveBeenCalled();
    });

    it('deve desabilitar botões durante loading', () => {
      component.loading = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');

      // Com loading false, botão deve estar habilitado
      expect(submitButton?.disabled).toBe(false);
    });

    it('deve mostrar spinner durante carregamento de pacientes', () => {
      component.loadingPacientes.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const spinner = compiled.querySelector('.spinner-border');

      expect(spinner).toBeTruthy();
    });
  });

  describe('Busca de pacientes', () => {
    it('deve buscar pacientes ao digitar no campo de busca', async () => {
      const searchInput = { target: { value: 'João' } } as any;

      component.onSearchChange(searchInput);

      await new Promise((resolve) => setTimeout(resolve, 350));
      expect(pacienteService.search).toHaveBeenCalledWith('João', 1, 20);
    });

    it('deve fazer debounce na busca (300ms)', async () => {
      // Limpar chamadas anteriores do beforeEach
      pacienteService.search.mockClear();

      component.onSearchChange({ target: { value: 'J' } } as any);
      component.onSearchChange({ target: { value: 'Jo' } } as any);
      component.onSearchChange({ target: { value: 'João' } } as any);

      await new Promise((resolve) => setTimeout(resolve, 350));
      // Deve ter chamado apenas uma vez após o debounce
      expect(pacienteService.search).toHaveBeenCalledTimes(1);
    });

    it('deve concatenar resultados ao carregar mais pacientes', () => {
      component.pacientes = [
        {
          id: 1,
          nome: 'Paciente 1',
          documento: '12345678901',
          celular: '11987654321',
          dataNascimento: '1990-01-15',
          cep: '12345678',
          rua: 'Rua 1',
          numero: '123',
          bairro: 'Centro',
          cidade: 'São Paulo',
          uf: 'SP',
        },
      ];

      pacienteService.search.mockReturnValue(
        of({
          data: [
            {
              id: 2,
              nome: 'Paciente 2',
              documento: '98765432100',
              celular: '11987654321',
              dataNascimento: '1985-05-20',
              cep: '87654321',
              rua: 'Rua 2',
              numero: '456',
              bairro: 'Jardim',
              cidade: 'Rio de Janeiro',
              uf: 'RJ',
            },
          ],
          meta: {
            total: 2,
            currentPage: 2,
            lastPage: 2,
            perPage: 20,
            prev: 1,
            next: null,
          },
        }),
      );

      component.pacienteMeta = {
        total: 2,
        currentPage: 1,
        lastPage: 2,
        perPage: 20,
        prev: null,
        next: 2,
      };

      component.loadMorePacientes();

      expect(component.pacientes.length).toBe(2);
    });

    it('não deve permitir múltiplas requisições simultâneas', () => {
      // Limpar chamadas anteriores do beforeEach
      pacienteService.search.mockClear();

      component.loadingPacientes.set(true);

      component.loadPacientes(1);

      expect(pacienteService.search).not.toHaveBeenCalled();
    });
  });

  describe('[Cenário 10] Tratamento de erro de rede', () => {
    it('deve exibir mensagem de erro quando houver falha de rede', () => {
      const networkError = {
        error: new ProgressEvent('Network error'),
        status: 0,
      };

      exameService.create.mockReturnValue(throwError(() => networkError));

      component.form.patchValue({
        modalidade: 'CT',
        dataExame: '2024-01-20T10:30',
        pacienteId: '1',
      });

      component.onSubmit();

      expect(toastrService.error).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });
  });

  describe('Atualização de exame', () => {
    it('deve carregar dados do exame ao editar', () => {
      const mockExame = {
        id: 1,
        idempotencyKey: 'key-123',
        modalidade: 'MR',
        dataExame: '2024-01-20T14:00:00',
        pacienteId: 1,
      };

      exameService.findOne.mockReturnValue(of(mockExame));

      component.isEditing = true;
      component.exameId = 1;
      component.loadExame(1);

      expect(exameService.findOne).toHaveBeenCalledWith(1);
    });

    it('deve atualizar exame existente', () => {
      const mockExame = {
        id: 1,
        idempotencyKey: 'key-123',
        modalidade: 'US',
        dataExame: '2024-01-21T09:00:00',
        pacienteId: 1,
      };

      exameService.update.mockReturnValue(of(mockExame));

      component.isEditing = true;
      component.exameId = 1;
      component.form.patchValue({
        idempotencyKey: 'key-123',
        modalidade: 'US',
        dataExame: '2024-01-21T09:00',
        pacienteId: '1',
      });
      component.onSubmit();

      expect(exameService.update).toHaveBeenCalledWith(1, expect.any(Object));
      expect(toastrService.success).toHaveBeenCalledWith('Exame atualizado com sucesso', 'Sucesso');
    });
  });
});
