import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O documento (CPF/RG) é obrigatório.' })
  documento: string;

  @IsString()
  @IsNotEmpty({ message: 'O celular é obrigatório.' })
  // Exemplo de Regex simples para celular: (99) 99999-9999
  @Matches(/^\d{10,11}$/, {
    message: 'Celular deve conter apenas números com DDD.',
  })
  celular: string;

  @IsDate({ message: 'A data de nascimento deve ser uma data válida.' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
  dataNascimento: Date;

  @IsString()
  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  cep: string;

  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{2}$/, {
    message: 'UF deve conter apenas 2 letras maiúsculas.',
  })
  uf: string;

  @IsString()
  @IsOptional()
  complemento?: string;
}
