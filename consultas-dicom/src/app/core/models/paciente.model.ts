import { Exame } from './exame.model';

export class Paciente {
  id?: number;
  dataCriacao?: Date;
  nome: string;
  documento: string;
  celular: string;
  dataNascimento: Date | string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
  exames?: Exame[];

  constructor(data?: Partial<Paciente>) {
    this.id = data?.id;
    this.dataCriacao = data?.dataCriacao;
    this.nome = data?.nome || '';
    this.documento = data?.documento || '';
    this.celular = data?.celular || '';
    this.dataNascimento = data?.dataNascimento || '';
    this.cep = data?.cep || '';
    this.rua = data?.rua || '';
    this.numero = data?.numero || '';
    this.bairro = data?.bairro || '';
    this.cidade = data?.cidade || '';
    this.uf = data?.uf || '';
    this.complemento = data?.complemento;
    this.exames = data?.exames;
  }
}
