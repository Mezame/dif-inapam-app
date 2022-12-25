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
    isReviewed?: boolean;
    isCardCanceled?: boolean;
    imageUrl?: string | null;
    metadata?: {
      sortId?: number;
      timestamp?: string;
    };
  }