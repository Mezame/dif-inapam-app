import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDocumentByCardCodeServiceMock } from '@mocks/document.mock';
import { Document } from '@features/documents/document.interface';
import { map, Observable, of } from 'rxjs';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { DocumentFormValue } from '@features/documents/document-add-edit-form/document-form-value.interface';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentEditComponent implements OnInit {
  cardCode!: string;
  document$!: Observable<Document>;

  constructor(
    private route: ActivatedRoute,
    private documentStoreService: DocumentStoreService,
    private updateDocumentsService: UpdateDocumentsService,
    private router: Router
  ) {
    this.cardCode = this.route.snapshot.params['cardCode'];
  }

  ngOnInit(): void {
    if (this.cardCode) {
      this.document$ = this.documentStoreService.getDocumentByCardCode(
        this.cardCode
      );
    }
  }

  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'editDocument') {
      const formData = { ...event.data } as Partial<DocumentFormValue>;

      const document = this.cleanFormData(formData) as Document;

      const imageBlob = formData.imageObj?.blob as File;

      let imageUrl: string;

      if (imageBlob) {
        console.log('Upload image to server', imageBlob);
      }

      if (document) {
        this.updateDocumentsService
          .updateDocument(this.cardCode, document)
          .subscribe((docRef) => {
            if (docRef == this.cardCode) {
              this.router.navigate(['/home/oficios', this.cardCode]);
            }
          });
      }
    }
  }

  cleanFormData(formData: Partial<DocumentFormValue>): Document | undefined {
    if (!formData) return;

    const preDocument = { ...formData };

    if (preDocument.imageObj) {
      delete preDocument.imageObj;
    }

    for (const data in preDocument) {
      if (
        preDocument[data as keyof Partial<DocumentFormValue>] == null ||
        preDocument[data as keyof Partial<DocumentFormValue>] == undefined
      ) {
        delete preDocument[data as keyof Partial<DocumentFormValue>];
      }
    }

    return preDocument as Document;
  }
}
