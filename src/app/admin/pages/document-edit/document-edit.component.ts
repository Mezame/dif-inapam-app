import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDocumentByCardCodeServiceMock } from '@mocks/document.mock';
import { Document } from '@features/documents/document.interface';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
})
export class DocumentEditComponent implements OnInit {
  cardCode!: string;
  document$!: Observable<Document>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cardCode = this.route.snapshot.params['cardCode'];

    this.document$ = of(getDocumentByCardCodeServiceMock(this.cardCode));
  }

  getDocumentAction(event: { action: string; data: {} }) {
    if (event.action == 'editDocument')
      console.log('Edit document', event.data);
  }
}
