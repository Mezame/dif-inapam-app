import { Injectable } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetDocumentsService } from '../get-documents.service';

@Injectable()
export class DocumentStoreService {
  private documents$ = new BehaviorSubject<Document[]>([]);

  private dateStore$ = new BehaviorSubject<DateStore>({
    months: {
      numbers: [],
      words: [],
    },
    years: [],
  });

  constructor(private getDocumentsService: GetDocumentsService) {}

  loadDocuments() {
    this.getDocumentsService.getDocuments().subscribe((documents) => {
      this.documents$.next(documents);
    });
  }

  getDocuments(): Observable<Document[]> {
    this.documents$.subscribe((documents) => {
      if (documents.length < 1) {
        this.loadDocuments();
      }
    });

    return this.documents$;
  }

  getDocumentByCardCode(cardCode: string): Observable<Document> {
    const documents$ = this.getDocuments();

    const document$ = documents$.pipe(
      map((documents) => {
        const document = documents.find((d) => d.cardCode == cardCode) ?? {};

        return document as Document;
      })
    );

    return document$;
  }

  addDocument(document: Document) {
    this.documents$.subscribe((documents) => {
      documents = [...documents, document];
    });
  }

  loadDocumentUtilsDateStore() {
    this.getDocumentsService
      .getDocumentUtilsDateStore()
      .subscribe((dateStore) => {
        this.dateStore$.next(dateStore);
      });
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    this.dateStore$.subscribe((dateStore) => {
      if (dateStore.years.length < 1) {
        this.loadDocumentUtilsDateStore();
      }
    });

    return this.dateStore$;
  }
}
