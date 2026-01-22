import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadeExame, ModalidadeExameLabels } from '@core/enums/modalidade.enum';
import { PaginationMeta } from '@core/interfaces/pagination.interface';
import { Exame } from '@core/models/exame.model';
import { Paciente } from '@core/models/paciente.model';
import { ExameService } from '@core/services/exame.service';
import { PacienteService } from '@core/services/paciente.service';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-exame-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskPipe],
  templateUrl: './exame-form.html',
  styleUrls: ['./exame-form.scss'],
})
export class ExameFormComponent implements OnInit {
  private exameService = inject(ExameService);
  private pacienteService = inject(PacienteService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  form = new FormBuilder().group({
    idempotencyKey: [{ value: '', disabled: true }],
    modalidade: ['', Validators.required],
    dataExame: ['', Validators.required],
    pacienteId: ['', Validators.required],
  });
  loading = false;
  isEditing = false;
  exameId?: number;
  networkError = false;
  pacientes: Paciente[] = [];
  pacienteMeta?: PaginationMeta;
  loadingPacientes = signal(false);
  searchQuery = '';
  private searchSubject = new Subject<string>();
  modalidades = Object.keys(ModalidadeExame);
  modalidadeLabels = ModalidadeExameLabels;

  ngOnInit(): void {
    this.setupSearch();
    // Carregar pacientes inicialmente (sem busca)
    this.loadPacientes(1);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.exameId = Number(id);
      this.loadExame(this.exameId);
    } else {
      // Gerar idempotency key para novo exame
      this.form.patchValue({ idempotencyKey: uuidv4() });
    }
  }

  setupSearch(): void {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      // Só executar se realmente mudou a query
      if (this.searchQuery === query) {
        return;
      }

      this.searchQuery = query;
      // Limpar lista e metadados antes de nova busca
      this.pacientes = [];
      this.pacienteMeta = undefined;
      this.loadPacientes(1);
    });
  }

  onSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  loadPacientes(page: number = 1): void {
    if (this.loadingPacientes()) {
      return;
    }

    this.loadingPacientes.set(true);

    this.pacienteService
      .search(this.searchQuery, page, 20)
      .pipe(
        finalize(() => {
          this.loadingPacientes.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          if (page === 1) {
            this.pacientes = response.data;
          } else {
            this.pacientes = [...this.pacientes, ...response.data];
          }
          this.pacienteMeta = response.meta;
        },
        error: (error) => {
          this.toastr.error('Erro ao carregar pacientes', 'Erro');
          console.error('Erro ao carregar pacientes:', error);
        },
      });
  }

  loadMorePacientes(): void {
    if (this.pacienteMeta?.next && !this.loadingPacientes()) {
      this.loadPacientes(this.pacienteMeta.next);
    }
  }

  get hasMorePacientes(): boolean {
    return !!this.pacienteMeta?.next;
  }

  loadExame(id: number): void {
    this.loading = true;
    this.networkError = false;
    this.exameService.findOne(id).subscribe({
      next: (exame) => {
        const dataExame = new Date(exame.dataExame);
        const dataExameStr = new Date(dataExame.getTime() - dataExame.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        this.form.patchValue({
          idempotencyKey: exame.idempotencyKey,
          modalidade: exame.modalidade,
          dataExame: dataExameStr,
          pacienteId: String(exame.pacienteId),
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
          this.toastr.error('Erro ao carregar exame', 'Erro');
          this.router.navigate(['/exames']);
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
    const formData = {
      ...this.form.getRawValue(),
      pacienteId: Number(this.form.value.pacienteId),
    } as Partial<Exame>;

    if (this.isEditing) {
      delete formData.idempotencyKey;
    }

    const observable = this.isEditing
      ? this.exameService.update(this.exameId!, formData)
      : this.exameService.create(new Exame(formData));

    observable.subscribe({
      next: () => {
        this.toastr.success(
          `Exame ${this.isEditing ? 'atualizado' : 'cadastrado'} com sucesso`,
          'Sucesso',
        );
        this.router.navigate(['/exames']);
      },
      error: (error) => {
        // Erro de rede: status 0 indica falha de conexão
        if (error.status === 0) {
          this.toastr.error(
            'Erro de conexão. Verifique sua internet e tente novamente.',
            'Erro de Rede',
          );
        } else {
          const message = error.error?.message || 'Erro ao salvar exame';
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
    return '';
  }

  getModalidadeLabel(modalidade: string): string {
    return this.modalidadeLabels[modalidade as ModalidadeExame] || modalidade;
  }
}
