import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getDocumentByCardCodeServiceMock } from '@mocks/document.mock';
import { Document } from '@features/documents/document.interface';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent implements OnInit {
  cardCode!: string;
  document$!: Observable<Document>;

  constructor(private route: ActivatedRoute) {
    this.cardCode = this.route.snapshot.params['cardCode'];
  }
  ngOnInit(): void {
    if (this.cardCode) {
      this.document$ = of(getDocumentByCardCodeServiceMock(this.cardCode));
    }
  }

  deleteDocument() {
    console.log('Delete document', this.cardCode);
  }

  cancelCard() {
    console.log('Cancel card', this.cardCode);
  }
}
