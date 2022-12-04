import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { documentsMock } from '@features/documents/mocks/document.mock';
import {
  getMonthsNumbers,
  getMonthsWords,
} from '@features/documents/utils/getCreateDateMonths';
import { getSelectOptions } from '@shared/getSelectOptions';
import { MonthNumber } from '@shared/monthNumber.type';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  documents$: Observable<Document[]> = of(documentsMock);
  monthsOptions = getSelectOptions(
    getMonthsNumbers(this.documents$),
    getMonthsWords(this.documents$)
  ).reverse();
  selectedMonth = this.monthsOptions[0].value as MonthNumber;

  ngOnInit(): void {
    console.log(this.selectedMonth);
  }
}
