import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { documentsMock } from '@features/documents/mocks/document.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.template.html',
  styleUrls: ['./document-list.template.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListTemplate {
  documents$: Observable<Document[]> = of(documentsMock);

}
