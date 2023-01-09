import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireAuthService } from '@core/auth/fire-auth.service';
import { Document } from '@features/documents/document.interface';
import { DeleteDocumentsService } from '@features/documents/services/firestore/delete-documents.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { DeleteFilesService } from '@shared/services/firestorage/delete-files.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent implements OnInit {
  cardCode: string;
  document$: Observable<Document>;
  isAdmin$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private fireAuthService: FireAuthService,
    private documentStoreService: DocumentStoreService,
    private updateDocumentsService: UpdateDocumentsService,
    private deleteDocumentsService: DeleteDocumentsService,
    private deleteFilesService: DeleteFilesService,
    private cDRef: ChangeDetectorRef,
    private alertsService: AlertsService,
    private router: Router
  ) {
    this.cardCode = this.route.snapshot?.params['cardCode'];

    this.document$ = this.route.data?.pipe(map((data) => data['document']));

    this.isAdmin$ = this.fireAuthService.isAdmin$;
  }
  ngOnInit(): void {}

  deleteDocument(document: Document) {
    const filename = document.cardCode;

    if (confirm('¿Confirmas eliminar oficio?') == true) {
      if (document.imageUrl) {
        this.deleteFilesService.deleteFile(filename).subscribe();
      }

      this.deleteDocumentsService.deleteDocument(filename).subscribe((res) => {
        if (res == true) {
          this.documentStoreService.deleteDocument(filename);

          this.router.navigate(['/home/oficios']);
        }
      });
    }
  }

  cancelCard(document: Document) {
    const id = document.cardCode;

    if (confirm('¿Confirmas cancelar tarjeta?') == true) {
      this.updateDocumentsService
        .updateDocument(id, { isCardCanceled: true })
        .subscribe((res) => {
          if (res == true) {
            const newDocument = { ...document, isCardCanceled: true };

            this.documentStoreService.updateDocument(id, newDocument);

            this.document$ =
              this.documentStoreService.getDocumentByCardCode(id);

            this.cDRef.markForCheck();

            this.alertsService.setAlert('Se ha cancelado la tarjeta');
          }
        });
    }
  }
}
