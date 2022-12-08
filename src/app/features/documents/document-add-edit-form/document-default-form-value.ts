import { DocumentFormValue } from "./document-form-value.interface";

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