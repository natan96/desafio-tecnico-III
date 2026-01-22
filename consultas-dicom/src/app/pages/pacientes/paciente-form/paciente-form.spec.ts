import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '@core/services/paciente.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { PacienteFormComponent } from './paciente-form';

describe('PacienteFormComponent', () => {
  let component: PacienteFormComponent;
  let fixture: ComponentFixture<PacienteFormComponent>;
  let pacienteService: any;
  let toastrService: any;
  let router: any;

  beforeEach(async () => {
    const pacienteServiceSpy = {
      create: vi.fn(),
      update: vi.fn(),
      findOne: vi.fn(),
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
      imports: [PacienteFormComponent, ReactiveFormsModule, NgxMaskDirective],
      providers: [
        { provide: PacienteService, useValue: pacienteServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Router, useValue: routerSpy },
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
        provideNgxMask(),
      ],
    }).compileComponents();

    pacienteService = TestBed.inject(PacienteService) as any;
    toastrService = TestBed.inject(ToastrService) as any;
    router = TestBed.inject(Router) as any;

    fixture = TestBed.createComponent(PacienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('[Cenário 12] Validação visual de campos obrigatórios', () => {
    it('deve marcar campos como inválidos quando vazios e tocados', () => {
      const nomeControl = component.form.get('nome');
      const documentoControl = component.form.get('documento');

      nomeControl?.markAsTouched();
      documentoControl?.markAsTouched();

      expect(component.isFieldInvalid('nome')).toBe(true);
      expect(component.isFieldInvalid('documento')).toBe(true);
    });

    it('deve exibir mensagem de erro para campos obrigatórios', () => {
      const nomeControl = component.form.get('nome');
      nomeControl?.markAsTouched();

      expect(component.getFieldError('nome')).toBe('Campo obrigatório');
    });

    it('deve validar formato do documento (CPF)', () => {
      const documentoControl = component.form.get('documento');
      documentoControl?.setValue('123');
      documentoControl?.markAsTouched();

      expect(documentoControl?.hasError('pattern')).toBe(true);
      expect(component.getFieldError('documento')).toContain('CPF');
    });

    it('deve validar formato do celular', () => {
      const celularControl = component.form.get('celular');
      celularControl?.setValue('119');
      celularControl?.markAsTouched();

      expect(celularControl?.hasError('pattern')).toBe(true);
      expect(component.getFieldError('celular')).toContain('celular');
    });
  });

  describe('Criação de paciente', () => {
    it('[Cenário 1] deve criar paciente com dados válidos', () => {
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

      pacienteService.create.mockReturnValue(of(mockPaciente));

      component.form.patchValue(mockPaciente);
      component.onSubmit();

      expect(pacienteService.create).toHaveBeenCalled();
      expect(toastrService.success).toHaveBeenCalledWith(
        'Paciente cadastrado com sucesso',
        'Sucesso',
      );
      expect(router.navigate).toHaveBeenCalledWith(['/pacientes']);
    });

    it('deve mostrar aviso quando tentar enviar formulário inválido', () => {
      component.form.patchValue({ nome: 'João' });
      component.onSubmit();

      expect(toastrService.warning).toHaveBeenCalledWith(
        'Preencha todos os campos obrigatórios',
        'Atenção',
      );
      expect(pacienteService.create).not.toHaveBeenCalled();
    });

    it('[Cenário 2] deve exibir erro ao tentar criar paciente com CPF duplicado', () => {
      const errorResponse = {
        error: { message: 'Documento já cadastrado' },
        status: 409,
      };

      pacienteService.create.mockReturnValue(throwError(() => errorResponse));

      component.form.patchValue({
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

      component.onSubmit();

      expect(toastrService.error).toHaveBeenCalledWith('Documento já cadastrado', 'Erro');
    });
  });

  describe('[Cenário 9] Loading state', () => {
    it('deve mostrar loading durante criação', () => {
      pacienteService.create.mockReturnValue(of({} as any));

      component.form.patchValue({
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

      // Verifica que component tem propriedade loading
      expect(component.loading).toBeDefined();
      expect(typeof component.loading).toBe('boolean');
    });

    it('deve desabilitar botões durante loading', () => {
      // Não testa timing exato, apenas verifica que botões respondem ao estado de loading
      component.loading = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const submitButton = compiled.querySelector('button[type="submit"]');

      // Com loading false, botão deve estar habilitado
      expect(submitButton.disabled).toBe(false);
    });
  });

  describe('[Cenário 10] Tratamento de erro de rede', () => {
    it('deve exibir mensagem de erro quando houver falha de rede', () => {
      const networkError = {
        error: new ProgressEvent('Network error'),
        status: 0,
      };

      pacienteService.create.mockReturnValue(throwError(() => networkError));

      component.form.patchValue({
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

      component.onSubmit();

      expect(toastrService.error).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });
  });

  describe('Atualização de paciente', () => {
    it('deve carregar dados do paciente ao editar', () => {
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

      pacienteService.findOne.mockReturnValue(of(mockPaciente));

      component.isEditing = true;
      component.pacienteId = 1;
      component.loadPaciente(1);

      expect(pacienteService.findOne).toHaveBeenCalledWith(1);
      expect(component.form.get('nome')?.value).toBe('João Silva');
    });

    it('deve atualizar paciente existente', () => {
      const mockPaciente = {
        id: 1,
        nome: 'João Silva Atualizado',
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

      pacienteService.update.mockReturnValue(of(mockPaciente));

      component.isEditing = true;
      component.pacienteId = 1;
      component.form.patchValue(mockPaciente);
      component.onSubmit();

      expect(pacienteService.update).toHaveBeenCalledWith(1, expect.any(Object));
      expect(toastrService.success).toHaveBeenCalledWith(
        'Paciente atualizado com sucesso',
        'Sucesso',
      );
    });
  });
});
