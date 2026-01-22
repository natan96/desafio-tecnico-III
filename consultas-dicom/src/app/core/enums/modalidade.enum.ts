export enum ModalidadeExame {
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

export const ModalidadeExameLabels: Record<ModalidadeExame, string> = {
  [ModalidadeExame.CR]: 'Radiografia Computadorizada',
  [ModalidadeExame.CT]: 'Tomografia Computadorizada',
  [ModalidadeExame.DX]: 'Radiografia Digital',
  [ModalidadeExame.MG]: 'Mamografia',
  [ModalidadeExame.MR]: 'Ressonância Magnética',
  [ModalidadeExame.NM]: 'Medicina Nuclear',
  [ModalidadeExame.OT]: 'Outros',
  [ModalidadeExame.PT]: 'Tomografia por Emissão de Pósitrons',
  [ModalidadeExame.RF]: 'Radiofluoroscopia',
  [ModalidadeExame.US]: 'Ultrassom',
  [ModalidadeExame.XA]: 'Angiografia por Raios-X',
};
