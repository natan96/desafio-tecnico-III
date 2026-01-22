import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    computed,
    inject,
    OnInit,
    PLATFORM_ID,
    signal,
    ViewChild,
} from '@angular/core';
import { Paciente } from '@core/models/paciente.model';
import { PacienteService } from '@core/services/paciente.service';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, NgxMaskPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  dataSelecionada = signal(new Date());

  textosPorDia: Record<number, string> = {
    '-1': 'Ontem',
    '0': 'Hoje',
    '1': 'Amanhã',
  };

  diferencaDias = computed(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const data = new Date(this.dataSelecionada());
    data.setHours(0, 0, 0, 0);

    return Math.floor((data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  });

  textoData = computed(() => {
    const diff = this.diferencaDias();
    return this.textosPorDia[diff] ?? new Date(this.dataSelecionada()).toLocaleDateString('pt-BR');
  });

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: ptBrLocale,
    customButtons: {
      prevDay: {
        text: '<',
        click: () => this.navegarDia(-1),
      },
      nextDay: {
        text: '>',
        click: () => this.navegarDia(1),
      },
      hoje: {
        text: 'Hoje',
        click: () => this.irParaHoje(),
      },
    },
    headerToolbar: {
      left: 'prevDay,nextDay hoje',
      center: 'title',
      right: '',
    },
    dateClick: (info: DateClickArg) => this.onDateClick(info.dateStr),
    editable: false,
    selectable: true,
    dayMaxEvents: true,
    weekends: true,
    height: 500,
    contentHeight: 450,
  };

  pacientes: Paciente[] = [];
  loading = false;
  networkError = false;

  constructor(
    private pacienteService: PacienteService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadPacientesPorData(this.dataSelecionada());
      this.atualizarBotaoHoje();
    }
  }

  onDateClick(dateStr: string): void {
    this.dataSelecionada.set(new Date(dateStr + 'T00:00:00'));
    this.loadPacientesPorData(this.dataSelecionada());

    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      const currentView = calendarApi.view;
      const newMonth = this.dataSelecionada().getMonth();
      const currentMonth = currentView.currentStart.getMonth();

      if (newMonth !== currentMonth) {
        calendarApi.gotoDate(this.dataSelecionada());
      }
    }
    this.destacarData();
    this.atualizarBotaoHoje();
  }

  navegarDia(dias: number): void {
    const novaData = new Date(this.dataSelecionada());
    novaData.setDate(novaData.getDate() + dias);
    this.dataSelecionada.set(novaData);
    this.loadPacientesPorData(this.dataSelecionada());

    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      const currentView = calendarApi.view;
      const newMonth = novaData.getMonth();
      const currentMonth = currentView.currentStart.getMonth();

      if (newMonth !== currentMonth) {
        calendarApi.gotoDate(this.dataSelecionada());
      }
    }
    this.destacarData();
    this.atualizarBotaoHoje();
  }

  irParaHoje(): void {
    this.dataSelecionada.set(new Date());
    this.loadPacientesPorData(this.dataSelecionada());

    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.today();
      calendarApi.render();
    }
    this.destacarData();
    this.atualizarBotaoHoje();
  }

  atualizarBotaoHoje(): void {
    setTimeout(() => {
      if (!this.isBrowser) return;

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const dataSel = new Date(this.dataSelecionada());
      dataSel.setHours(0, 0, 0, 0);

      const isHoje = dataSel.getTime() === hoje.getTime();
      const botaoHoje = document.querySelector('.fc-hoje-button');

      if (botaoHoje) {
        if (isHoje) {
          botaoHoje.setAttribute('disabled', 'true');
        } else {
          botaoHoje.removeAttribute('disabled');
        }
      }
    }, 100);
  }

  destacarData(): void {
    setTimeout(() => {
      if (!this.isBrowser) return;

      document.querySelectorAll('.fc-daygrid-day').forEach((el) => {
        el.classList.remove('data-selecionada');
      });

      const dataStr = format(this.dataSelecionada(), 'yyyy-MM-dd');
      const cellElement = document.querySelector(`[data-date="${dataStr}"]`);
      if (cellElement) {
        cellElement.classList.add('data-selecionada');
      }
    }, 100);
  }

  loadPacientesPorData(data: Date): void {
    this.loading = true;
    this.networkError = false;
    this.cdr.detectChanges();

    const dataStr = format(data, 'yyyy-MM-dd');

    this.pacienteService.findByDate(dataStr).subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.loading = false;
        this.networkError = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('loadPacientesPorData - erro:', error);
        if (error.status === 0) {
          this.networkError = true;
          this.toastr.error('Erro de conexão. Verifique sua internet.', 'Erro de Rede');
        } else {
          this.toastr.error('Erro ao carregar pacientes', 'Erro');
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  retry(): void {
    this.loadPacientesPorData(this.dataSelecionada());
  }
}
