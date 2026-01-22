export class Paciente {
  id: number;
  nome: string;
  documento: string;
  celular: string;
  dataNascimento: Date;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento: string | null;
}
