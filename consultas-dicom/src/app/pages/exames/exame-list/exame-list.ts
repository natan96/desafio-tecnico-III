import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalidadeExameLabels } from '@core/enums/modalidade.enum';
import { PaginationMeta } from '@core/interfaces/pagination.interface';
import { Exame } from '@core/models/exame.model';
import { ExameService } from '@core/services/exame.service';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exame-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskPipe],
  templateUrl: './exame-list.html',
  styleUrls: ['./exame-list.scss'],
})
export class ExameListComponent implements OnInit {
  private exameService = inject(ExameService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  exames: Exame[] = [];
  meta?: PaginationMeta;
  loading = false;
  networkError = false;
  modalidadeLabels = ModalidadeExameLabels;

  ngOnInit(): void {
    this.loadExames();
  }

  loadExames(page: number = 1): void {
    this.loading = true;
    this.networkError = false;
    this.cdr.detectChanges();

    this.exameService.findAll(page, 10).subscribe({
      next: (response) => {
        this.exames = response.data;
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
          this.toastr.error('Erro ao carregar exames', 'Erro');
        }
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar exames:', error);
      },
    });
  }

  goToPage(page: number): void {
    this.loadExames(page);
  }

  get pages(): number[] {
    if (!this.meta) return [];
    return Array.from({ length: this.meta.lastPage }, (_, i) => i + 1);
  }

  getModalidadeLabel(modalidade: string): string {
    return this.modalidadeLabels[modalidade as keyof typeof this.modalidadeLabels] || modalidade;
  }
}
