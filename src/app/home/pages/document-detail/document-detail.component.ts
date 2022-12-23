import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '@features/documents/document.interface';
import { DeleteDocumentsService } from '@features/documents/services/firestore/delete-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent implements OnInit {
  cardCode!: string;
  document$!: Observable<Document>;

  constructor(
    private route: ActivatedRoute,
    private documentStoreService: DocumentStoreService,
    private updateDocumentsService: UpdateDocumentsService,
    private deleteDocumentsService: DeleteDocumentsService,
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

  deleteDocument() {
    if (confirm('¿Confirmas eliminar oficio?') == true) {
      this.deleteDocumentsService
        .deleteDocument(this.cardCode)
        .subscribe((docRef) => {
          if (docRef === true) {
            this.router.navigate(['/home/oficios']);
          }
        });
    }
  }

  cancelCard() {
    if (confirm('¿Confirmas cancelar tarjeta?') == true) {
      this.updateDocumentsService
        .updateDocument(this.cardCode, { isCardCanceled: true })
        .subscribe((docRef) => {
          if (docRef == this.cardCode) {
            //do something
          }
        });
    }
  }
}
