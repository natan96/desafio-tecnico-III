import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationMeta } from '@core/interfaces/pagination.interface';
import { Paciente } from '@core/models/paciente.model';
import { PacienteService } from '@core/services/paciente.service';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskPipe],
  templateUrl: './paciente-list.html',
  styleUrls: ['./paciente-list.scss'],
})
export class PacienteListComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  pacientes: Paciente[] = [];
  meta?: PaginationMeta;
  loading = false;
  networkError = false;

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(page: number = 1): void {
    this.loading = true;
    this.networkError = false;
    this.cdr.detectChanges();

    this.pacienteService.findAll(page, 10).subscribe({
      next: (response) => {
        this.pacientes = response.data;
        this.meta = response.meta;
        this.loading = false;
        this.networkError = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        if (error.status === 0) {
          this.networkError = true;
          this.toastr.error('Erro de conexão. Verifique sua internet.', 'Erro de Rede');
        } else {
          this.toastr.error('Erro ao carregar pacientes', 'Erro');
        }
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar pacientes:', error);
      },
    });
  }

  goToPage(page: number): void {
    this.loadPacientes(page);
  }

  get pages(): number[] {
    if (!this.meta) return [];
    return Array.from({ length: this.meta.lastPage }, (_, i) => i + 1);
  }
}
