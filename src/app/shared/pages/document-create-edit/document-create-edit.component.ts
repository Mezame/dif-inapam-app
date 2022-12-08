import { Component } from '@angular/core';

@Component({
  selector: 'app-document-create-edit',
  templateUrl: './document-create-edit.component.html',
  styleUrls: ['./document-create-edit.component.scss'],
})
export class DocumentCreateEditComponent {
  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'createDocument')
      console.log('Create document', event.data);
  }
}
