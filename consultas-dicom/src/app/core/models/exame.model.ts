import { ModalidadeExame } from '@core/enums/modalidade.enum';
import { Paciente } from './paciente.model';

export class Exame {
  id?: number;
  dataCriacao?: Date;
  idempotencyKey: string;
  modalidade: ModalidadeExame | string;
  dataExame: Date | string;
  pacienteId: number;
  paciente?: Paciente;

  constructor(data?: Partial<Exame>) {
    this.id = data?.id;
    this.dataCriacao = data?.dataCriacao;
    this.idempotencyKey = data?.idempotencyKey || '';
    this.modalidade = data?.modalidade || '';
    this.dataExame = data?.dataExame || '';
    this.pacienteId = data?.pacienteId || 0;
    this.paciente = data?.paciente;
  }
}
