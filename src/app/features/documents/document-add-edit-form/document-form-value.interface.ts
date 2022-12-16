export interface DocumentFormValue {
  createDate: Date | string | null;
  cardCode: string | null;
  operationCode: string | null;
  branchOffice: string | null;
  reviewDocument: string | null;
  makeCard: string | null;
  fathersLastname: string | null;
  mothersLastname: string | null;
  name: string | null;
  sex: string | null;
  birthdate: Date | string | null;
  birthplace: string | null;
  curp: string | null;
  maritalStatus: string | null;
  imageObj: { url: string | null; blob: File | null } | null;
}
