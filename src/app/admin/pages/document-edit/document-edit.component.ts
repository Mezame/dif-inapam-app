import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentFormValue } from '@features/documents/document-add-edit-form/document-form-value.interface';
import { Document } from '@features/documents/document.interface';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { DeleteFilesService } from '@shared/services/firebase-storage/delete-files.service';
import { UploadFilesService } from '@shared/services/firebase-storage/upload-files.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentEditComponent implements OnInit {
  cardCode: string;
  document$: Observable<Document>;

  constructor(
    private route: ActivatedRoute,
    private documentStoreService: DocumentStoreService,
    private updateDocumentsService: UpdateDocumentsService,
    private uploadFilesService: UploadFilesService,
    private deleteFilesService: DeleteFilesService,
    private router: Router
  ) {
    this.cardCode = this.route.snapshot.params['cardCode'];

    this.document$ = this.route.data.pipe(map((data) => data['document']));
  }

  ngOnInit(): void {}

  getDocumentAction(event: {
    action: string;
    data: { documentFormValue: any; hasImage: boolean };
  }) {
    if (event.action == 'editDocument') {
      const formData = {
        ...event.data.documentFormValue,
      } as Partial<DocumentFormValue>;

      const hasImage = event.data.hasImage as boolean;

      const document = this.cleanFormData(formData) as Partial<Document>;

      const imageBlob = formData.imageObj?.blob as File;

      const imageUrl = formData.imageObj?.url as string;

      const filename = this.cardCode as string;

      if (hasImage && !imageUrl && !imageBlob) {
        this.deleteFilesService
          .deleteFile(filename)
          .subscribe((deleteResult) => {
            if (deleteResult == true) {
              document.imageUrl = null;
            }

            this.editDocument(document);
          });
      }

      if (imageBlob) {
        this.uploadFilesService
          .uploadFromBlob(imageBlob, filename)
          .subscribe((downloadUrl) => {
            if (downloadUrl && typeof downloadUrl == 'string') {
              document.imageUrl = downloadUrl;
            }

            this.editDocument(document);
          });
      }

      if (!hasImage && !imageBlob) {
        this.editDocument(document);
      }
    }
  }

  editDocument(document: Partial<Document>) {
    const cardCode = this.cardCode;

    if (document) {
      this.updateDocumentsService
        .updateDocument(cardCode, document)
        .subscribe((res) => {
          if (res == true) {
            this.documentStoreService.updateDocument(cardCode, document);

            this.router.navigate(['/home/oficios', cardCode]);
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
