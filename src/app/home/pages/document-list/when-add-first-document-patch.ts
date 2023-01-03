import { Document } from '@features/documents/document.interface';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';

let isPatchEnable = true;

export function whenAddFirstDocumentPatch(
  documentStoreService: DocumentStoreService
) {
  if (!isPatchEnable) return;

  const documents = documentStoreService.getDocumentsValue() as Document[];
  let counter = 1;

  while (documents.length == 1 && counter == 1) {
    setTimeout(() => {
      location.reload();
    }, 3000);

    counter++;
  }
}
