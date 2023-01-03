import { Document } from '@features/documents/document.interface';

export function whenAddFirstDocumentPatch(documents: readonly Document[]) {
  let counter = 1;

  while (documents.length == 1 && counter == 1) {
    setTimeout(() => {
      location.reload();
    }, 4000);

    counter++;
  }
}
