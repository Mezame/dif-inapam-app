import { Injectable } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { BehaviorSubject, filter, map, mergeMap, Observable } from 'rxjs';
import { GetDocumentsService } from '../firestore/get-documents.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentStoreService {
  private readonly documents$: BehaviorSubject<Document[]>;
  private readonly dateStore$: BehaviorSubject<DateStore>;

  private mockDocuments = [
    {
      createDate: '11/9/2022, 2:45:49 PM',
      operationCode: 'NUEVO REG',
      cardCode: 'P000000000',
      branchOffice: 'VER-TUXPAN',
      reviewDocument: 'Valeria B. Alarcón',
      makeCard: 'Valeria B. Alarcón',
      fathersLastname: 'Vega',
      mothersLastname: 'Hidalgo',
      name: 'Ramona',
      sex: 'Mujer',
      birthdate: '10/31/1965, 4:16:41 PM',
      birthplace: 'Veracruz',
      curp: 'WUVJ302842THBYVQ00',
      maritalStatus: 'Casado',
    },
  ] as Document[];
  private mockdateStore = {
    months: {
      ['2022']: {
        numbers: ['11'],
        words: ['noviembre'],
      },
    },
    years: ['2022'],
  } as DateStore;

  constructor(private getDocumentsService: GetDocumentsService) {
    this.documents$ = new BehaviorSubject<Document[]>(this.mockDocuments);
    this.dateStore$ = new BehaviorSubject<DateStore>(this.mockdateStore);
  }

  loadDocuments() {
    this.getDocumentsService
      .getDocuments()
      .pipe(map((documents) => (documents.length > 0 ? documents : null)))
      .subscribe((documents) => {
        if (documents) {
          this.documents$.next(documents);
        }
      });
  }

  getDocumentsValue(): readonly Document[] {
    const documents = this.documents$.getValue() as ReadonlyArray<Document>;

    return documents;
  }

  getDocuments(): Observable<Document[]> {
    const documents = this.getDocumentsValue();

    if (documents?.length < 1 || documents[0]?.cardCode == 'P000000000') {
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
    const documents = this.getDocumentsValue();

    const newDocuments = [...documents, document];

    this.documents$.next(newDocuments);
  }

  updateDocument(cardCode: string, document: Partial<Document>) {
    const documents = this.getDocumentsValue();

    const index = documents.findIndex((doc) => doc.cardCode == cardCode);

    const newDocument = { ...documents[index], ...document };

    let newDocuments = [...documents];

    newDocuments.splice(index, 1, newDocument);

    this.documents$.next(newDocuments);
  }

  deleteDocument(cardCode: string) {
    const documents = this.getDocumentsValue();

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
      .pipe(map((dateStore) => (dateStore.years?.length > 0 ? dateStore : null)))
      .subscribe((dateStore) => {
        console.log(dateStore);
        if (dateStore) {
          this.dateStore$.next(dateStore);
        }
      });
  }

  getDocumentUtilsDateStore(): Observable<DateStore> {
    const dateStore = this.dateStore$.getValue() as Readonly<DateStore>;

    if (
      dateStore?.years.length < 1 ||
      (dateStore?.years[0] == '2022' &&
        dateStore?.months['2022'].numbers[0] == '11')
    ) {
      this.loadDocumentUtilsDateStore();
    }

    return this.dateStore$;
  }
}
