export interface Document {
  createDate: string;
  operationCode: 'NUEVO REG' | 'REPOSICION' | 'CANJE';
  cardCode: string;
  fathersLastname: string;
  mothersLastname: string;
  name: string;
  sex: 'Hombre' | 'Mujer';
  birthdate: string;
  birthplace: string;
  curp: string;
  maritalStatus: 'Casado' | 'Soltero';
  metadata?: {
    id?: number;
    timestamp?: string;
  };
}
