import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getDocumentByCardCodeServiceMock } from '@shared/mocks/document.mock';
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
  document$!: Observable<Document>;

  constructor(private route: ActivatedRoute) {
    const cardCode = route.snapshot.params['cardCode'];

    this.document$ = of(getDocumentByCardCodeServiceMock(cardCode));
  }

  getDocumentAction(event: { action: string; data: string }) {
    if (event.action == 'deleteDocument')
      console.log('Delete document', event.data);
  }
}
