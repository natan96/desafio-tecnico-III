import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum ModalidadeDICOM {
  CR = 'CR',
  CT = 'CT',
  DX = 'DX',
  MG = 'MG',
  MR = 'MR',
  NM = 'NM',
  OT = 'OT',
  PT = 'PT',
  RF = 'RF',
  US = 'US',
  XA = 'XA',
}

export class CreateExameDto {
  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;

  @IsEnum(ModalidadeDICOM, {
    message:
      'Modalidade deve ser uma das seguintes: ' +
      Object.values(ModalidadeDICOM).join(', '),
  })
  modalidade: string;

  @IsDate({ message: 'A data do exame deve ser uma data válida.' })
  @Type(() => Date)
  @IsNotEmpty()
  dataExame: Date;

  @IsInt()
  @IsNotEmpty()
  pacienteId: number;
}
