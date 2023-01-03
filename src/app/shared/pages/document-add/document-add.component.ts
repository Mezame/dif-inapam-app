import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentFormValue } from '@features/documents/document-add-edit-form/document-form-value.interface';
import { Document } from '@features/documents/document.interface';
import { AddDocumentsService } from '@features/documents/services/firestore/add-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { UploadFilesService } from '@shared/services/firestorage/upload-files.service';

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
    private uploadFilesService: UploadFilesService,
    private alertsService: AlertsService,
    private router: Router
  ) {}

  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'addDocument') {
      const formData = { ...event.data } as Partial<DocumentFormValue>;

      const document = this.cleanFormData(formData) as Document;

      const imageBlob = formData.imageObj?.blob as File;

      if (imageBlob) {
        this.uploadFilesService
          .uploadFromBlob(imageBlob, document.cardCode)
          .subscribe((downloadUrl) => {
            if (downloadUrl && typeof downloadUrl == 'string') {
              document.imageUrl = downloadUrl;

              this.addDocument(document);
            } else {
              this.alertsService.setAlert(`No ha sido posible agregar la foto`);

              setTimeout(() => {
                this.addDocument(document);
              }, 2000);
            }
          });
      } else {
        this.addDocument(document);
      }
    }
  }

  addDocument(document: Document) {
    if (document) {
      this.addDocumentsService
        .setDocument(document.cardCode, document)
        .subscribe((res) => {
          if (res == true) {
            this.documentStoreService.addDocument(document);

            this.router.navigate(['/home/oficios']);
          }
        });
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
