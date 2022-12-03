import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { documentsMock } from '@features/documents/mocks/document.mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent {
  documents$: Observable<Document[]> = of(documentsMock);

}
