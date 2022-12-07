import { Observable, tap } from 'rxjs';
import { Document } from '@features/documents/document.interface';

export function getOperationCodes(documents: Observable<Document[]>): string[] {
  let operationCodes: string[] = [];

  documents
    .pipe(
      tap((documents) => {
        documents.forEach((document) => {
          if (!operationCodes.includes(document.operationCode)) {
            operationCodes.push(document.operationCode);
          }
        });
      })
    )
    .subscribe();

  return operationCodes;
}
