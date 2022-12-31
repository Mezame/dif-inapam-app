import { Injectable } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GetDocumentsService } from '../firestore/get-documents.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentStoreService {
  private readonly documents$ = new BehaviorSubject<Document[]>([]);

  private readonly dateStore$ = new BehaviorSubject<DateStore>({
    months: {
      ['']: {
        numbers: [],
        words: [],
      },
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
    const documents = this.documents$.getValue();

    if (documents?.length < 1) {
      this.loadDocuments();
    }

    return this.documents$;
  }

  getDocumentByCardCode(cardCode: string): Observable<Document> {
    const document$ = this.getDocuments().pipe(
      map((documents) => {
        const document = documents.find(
          (d) => d.cardCode == cardCode ?? {}
        ) as Document;

        return document;
      })
    );

    return document$;
  }

  addDocument(document: Document) {
    const documents = this.documents$.getValue() as ReadonlyArray<Document>;

    const newDocuments = [...documents, document];

    this.documents$.next(newDocuments);
  }

  updateDocument(cardCode: string, document: Partial<Document>) {
    const documents = this.documents$.getValue() as ReadonlyArray<Document>;

    const index = documents.findIndex((doc) => doc.cardCode == cardCode);

    const newDocument = { ...documents[index], ...document };

    let newDocuments = [...documents];

    newDocuments.splice(index, 1, newDocument);

    this.documents$.next(newDocuments);
  }

  deleteDocument(cardCode: string) {
    const documents = this.documents$.getValue() as ReadonlyArray<Document>;

    const index = documents.findIndex(
      (document) => document.cardCode == cardCode
    );

    let newDocuments = [...documents];

    newDocuments.splice(index, 1);

    this.documents$.next(newDocuments);
  }

  loadDocumentUtilsDateStore() {
    this.getDocumentsService
      .getDocumentUtilsDateStore()
      .subscribe((dateStore) => {
        this.dateStore$.next(dateStore);
      });
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    const dateStore = this.dateStore$.getValue();

    if (dateStore.years?.length < 1) {
      this.loadDocumentUtilsDateStore();
    }

    return this.dateStore$;
  }
}
