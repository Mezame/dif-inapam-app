import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '@features/documents/document.interface';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
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
    private documentStoreService: DocumentStoreService
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
    console.log('Delete document', this.cardCode);
  }

  cancelCard() {
    console.log('Cancel card', this.cardCode);
  }
}
