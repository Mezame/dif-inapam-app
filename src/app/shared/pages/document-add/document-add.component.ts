import { Component } from '@angular/core';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss'],
})
export class DocumentAddComponent {
  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'addDocument')
      console.log('Add document', event.data);
  }
}
