interface Document {
  creationDate: string;
  operationCode: 'NUEVO REG' | 'REPOSICION' | 'CANJE';
  cardCode: string;
  fathersLastname: string;
  mothersLastname: string;
  name: string;
  sex: 'H' | 'M';
  birthdate: string;
  birthplace: string;
  curp: string;
  maritalStatus: 'C' | 'S';
  metadata?: {
    id?: number;
    timestamp?: string;
  };
}
