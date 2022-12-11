export interface Document {
  createDate: string;
  operationCode: 'NUEVO REG' | 'REPOSICION' | 'CANJE';
  cardCode: string;
  branchOffice: string;
  reviewDocument: string;
  makeCard: string;
  fathersLastname: string;
  mothersLastname: string;
  name: string;
  sex: 'Hombre' | 'Mujer';
  birthdate: string;
  birthplace: string;
  curp: string;
  maritalStatus: 'Casado' | 'Soltero';
  cancelCard?: boolean;
  imageUrl?: string;
  metadata?: {
    id?: number;
    createDate?: string;
  };
}
