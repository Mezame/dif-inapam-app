import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DateStore } from '@features/documents/date-store.interface';
import { Document } from '@features/documents/document.interface';
import { DocumentStoreService } from '@features/documents/services/firestore/store/document-store.service';
import { MonthNumber } from '@shared/types/month-number.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  dateStore$!: Observable<DateStore>;
  documents$!: Observable<Document[]>;

  selectedYear!: string;
  selectedMonth!: MonthNumber;

  constructor(private documentStoreService: DocumentStoreService) {}

  ngOnInit() {
    this.dateStore$ = this.documentStoreService.getDocumentUtilsDateStore();

    this.documents$ = this.documentStoreService.getDocuments();
  }

  changeSelectedValue(selectRef: string, value: string): void {
    if (selectRef == 'selectedYear') this.selectedYear = value;

    if (selectRef == 'selectedMonth') this.selectedMonth = value as MonthNumber;
  }
}
