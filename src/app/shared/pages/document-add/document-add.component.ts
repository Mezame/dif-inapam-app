import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentFormValue } from '@features/documents/document-add-edit-form/document-form-value.interface';
import { Document } from '@features/documents/document.interface';
import { AddDocumentsService } from '@features/documents/services/firestore/add-documents.service';
import { DocumentStoreService } from '@features/documents/services/firestore/store/document-store.service';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAddComponent {
  constructor(
    private addDocumentsService: AddDocumentsService,
    private documentStoreService: DocumentStoreService,
    private router: Router
  ) {}

  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'addDocument') {
      const formData = { ...event.data } as Partial<DocumentFormValue>;

      const document = this.cleanFormData(formData);

      const imageBlob = (event.data as Partial<DocumentFormValue>).imageObj
        ?.blob;

      if (imageBlob) {
        console.log('Upload image to server', imageBlob);
      }

      if (document) {
        console.log('Add document', document);

        this.addDocumentsService
          .setDocument(document.cardCode, document)
          .subscribe((docRef) => {
            if (docRef == document.cardCode) {
              this.documentStoreService.addDocument(document);

              this.router.navigate(['/home/oficios']);
            }
          });
      }
    }
  }

  cleanFormData(formData: any): Document | undefined {
    if (!formData) return;

    const document = formData;

    delete document.imageObj;

    for (const data in document) {
      if (document[data] == null || document[data] == undefined) {
        delete document[data];
      }
    }

    return document as Document;
  }
}
