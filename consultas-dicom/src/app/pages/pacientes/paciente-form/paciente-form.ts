import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '@core/models/paciente.model';
import { PacienteService } from '@core/services/paciente.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './paciente-form.html',
  styleUrls: ['./paciente-form.scss'],
})
export class PacienteFormComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  ufs = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  form = new FormBuilder().group({
    nome: ['', [Validators.required, Validators.maxLength(100)]],
    documento: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    dataNascimento: ['', Validators.required],
    cep: ['', [Validators.required, Validators.maxLength(100)]],
    rua: ['', [Validators.required, Validators.maxLength(100)]],
    numero: ['', [Validators.required, Validators.maxLength(100)]],
    bairro: ['', [Validators.required, Validators.maxLength(100)]],
    cidade: ['', [Validators.required, Validators.maxLength(100)]],
    uf: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
    complemento: ['', Validators.maxLength(100)],
  });
  loading = false;
  isEditing = false;
  pacienteId?: number;
  networkError = false;
  maxDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.pacienteId = Number(id);
      this.loadPaciente(this.pacienteId);
    }
  }

  loadPaciente(id: number): void {
    this.loading = true;
    this.networkError = false;
    this.pacienteService.findOne(id).subscribe({
      next: (paciente) => {
        const dataNascimento = new Date(paciente.dataNascimento);
        this.form.patchValue({
          ...paciente,
          dataNascimento: dataNascimento.toISOString().split('T')[0],
        });
        this.loading = false;
      },
      error: (error) => {
        // Erro de rede: status 0 indica falha de conexão
        if (error.status === 0) {
          this.networkError = true;
          this.toastr.error(
            'Erro de conexão. Verifique sua internet e tente novamente.',
            'Erro de Rede',
          );
        } else {
          this.toastr.error('Erro ao carregar paciente', 'Erro');
          this.router.navigate(['/pacientes']);
        }
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Preencha todos os campos obrigatórios', 'Atenção');
      return;
    }

    this.loading = true;
    const formData = this.form.value as Partial<Paciente>;

    const observable = this.isEditing
      ? this.pacienteService.update(this.pacienteId!, formData)
      : this.pacienteService.create(new Paciente(formData));

    observable.subscribe({
      next: () => {
        this.toastr.success(
          `Paciente ${this.isEditing ? 'atualizado' : 'cadastrado'} com sucesso`,
          'Sucesso',
        );
        this.router.navigate(['/pacientes']);
      },
      error: (error) => {
        // Erro de rede: status 0 indica falha de conexão
        if (error.status === 0) {
          this.toastr.error(
            'Erro de conexão. Verifique sua internet e tente novamente.',
            'Erro de Rede',
          );
        } else {
          const message = error.error?.message || 'Erro ao salvar paciente';
          this.toastr.error(message, 'Erro');
        }
        this.loading = false;
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'Campo obrigatório';
    if (control?.hasError('pattern')) {
      if (field === 'documento') return 'CPF inválido';
      if (field === 'celular') return 'Número de celular inválido';
      return 'Formato inválido';
    }
    if (control?.hasError('maxLength')) return 'Tamanho máximo excedido';
    return '';
  }
}
