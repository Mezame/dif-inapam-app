import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { MonthNumber } from '@shared/types/month-number.type';
import { Observable } from 'rxjs';
import { whenAddFirstDocumentPatch } from './when-add-first-document-patch';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  dateStore$!: Observable<DateStore | any>;
  documents$!: Observable<Document[]>;

  selectedYear?: string;
  selectedMonth?: MonthNumber;

  constructor(private documentStoreService: DocumentStoreService) {
    const documents = this.documentStoreService.getDocumentsValue();
    whenAddFirstDocumentPatch(documents);
  }

  ngOnInit() {
    this.dateStore$ = this.documentStoreService.getDocumentUtilsDateStore();

    this.documents$ = this.documentStoreService.getDocuments();
  }

  changeSelectedValue(selectRef: string, value: string): void {
    if (selectRef == 'selectedYear') this.selectedYear = value;

    if (selectRef == 'selectedMonth') this.selectedMonth = value as MonthNumber;
  }
}
