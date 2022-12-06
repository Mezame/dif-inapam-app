import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getDocumentByCardCodeServiceMock } from '@features/documents/mocks/document.mock';
import { Document } from '@features/documents/document.interface';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent {
  cardCode$!: Observable<string>;
  document$!: Observable<Document>;

  constructor(private route: ActivatedRoute) {
    this.cardCode$ = route.params.pipe(map((params) => params['cardCode']));

    this.cardCode$.subscribe(
      (c) => (this.document$ = of(getDocumentByCardCodeServiceMock(c)))
    );
  }

  getDocumentAction(event: { action: string; data: string }) {
    if (event.action == 'deleteDocument') console.log('Delete document', event.data);
  }
}
