import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../document.interface';

@Component({
  selector: 'app-document-detail-content',
  templateUrl: './document-detail-content.component.html',
  styleUrls: ['./document-detail-content.component.scss']
})
export class DocumentDetailContentComponent {

  @Input('data') document$!: Observable<Document>;

}
