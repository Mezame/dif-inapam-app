import { DocumentFormValue } from './document-form-value.interface';

export const documentDefaultFormValue = {
  branchOffice: 'VER-TUXPAN',
  reviewDocument: 'Valeria B. Alarcón',
  makeCard: 'Valeria B. Alarcón',
};

export function setDefaultDocumentFormValue(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  documentFormValue.createDate = new Date().toString();

  documentFormValue.branchOffice = documentDefaultFormValue.branchOffice;

  documentFormValue.reviewDocument = documentDefaultFormValue.reviewDocument;

  documentFormValue.makeCard = documentDefaultFormValue.makeCard;

  return documentFormValue;
}

export function formatDocumentFormValue(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  documentFormValue = transformDateToString(documentFormValue);

  documentFormValue = changeFileName(documentFormValue);

  return documentFormValue;
}

function transformDateToString(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  if (
    documentFormValue.createDate &&
    typeof documentFormValue.createDate != 'string'
  ) {
    documentFormValue.createDate = documentFormValue.createDate.toString();
  }

  if (
    documentFormValue.birthdate &&
    typeof documentFormValue.birthdate != 'string'
  ) {
    documentFormValue.birthdate = documentFormValue.birthdate.toString();
  }

  return documentFormValue;
}

function changeFileName(
  documentFormValue: Partial<DocumentFormValue>
): Partial<DocumentFormValue> {
  if (documentFormValue.imageObj?.blob) {
    const file = documentFormValue.imageObj.blob;
    const cardCode = documentFormValue.cardCode;
    let newFileName: string;

    if (file!.type == 'image/jpeg' || file!.type == 'image/jpg') {
      newFileName = `${cardCode}.jpg`;
    }

    if (file!.type == 'image/png') {
      newFileName = `${cardCode}.png`;
    }

    const changedFileName = new File([file!], newFileName!, {
      type: file!.type,
    });

    documentFormValue.imageObj.blob = changedFileName;
  }

  return documentFormValue;
}
