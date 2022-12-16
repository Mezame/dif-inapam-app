import { DocumentFormValue } from './document-form-value.interface';

export const documentDefaultFormValue = {
  createDate: new Date(Date.now()),
  branchOffice: 'VER-TUXPAN',
  reviewDocument: 'Valeria B. Alarcón',
  makeCard: 'Valeria B. Alarcón',
};

export function setDefaultDocumentFormValue(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  documentFormValue.createDate = documentDefaultFormValue.createDate;

  documentFormValue.branchOffice = documentDefaultFormValue.branchOffice;

  documentFormValue.reviewDocument = documentDefaultFormValue.reviewDocument;

  documentFormValue.makeCard = documentDefaultFormValue.makeCard;

  return documentFormValue;
}

export function dateToString(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  if (
    documentFormValue.createDate &&
    typeof documentFormValue.createDate != 'string'
  )
    documentFormValue.createDate = documentFormValue.createDate?.toString();

  if (
    documentFormValue.createDate &&
    typeof documentFormValue.birthdate != 'string'
  )
    documentFormValue.birthdate = documentFormValue.birthdate?.toString();

  return documentFormValue;
}
