import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { documentsMock } from '@shared/mocks/document.mock';
import {
  getMonthsNumbers,
  getMonthsWords,
  getYears,
} from '@features/documents/utils/get-create-date';
import {
  getSelectOptions,
  SelectOptions,
} from '@shared/utils/get-select-options';
import { MonthNumber } from '@shared/types/month-number.type';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  documents$?: Observable<Document[]>;

  yearsOptions!: string[];
  monthsOptions!: SelectOptions[];

  selectedYear!: string;
  selectedMonth!: MonthNumber;

  ngOnInit(): void {
    this.documents$ = of(documentsMock);

    if (this.documents$) {
      this.yearsOptions = getYears(this.documents$);

      this.selectedYear = this.yearsOptions[this.yearsOptions.length - 1];

      this.monthsOptions = getSelectOptions(
        getMonthsNumbers(this.documents$, this.selectedYear),
        getMonthsWords(this.documents$, this.selectedYear)
      );

      this.selectedMonth = this.monthsOptions[this.monthsOptions.length - 1]
        .value as MonthNumber;
    }
  }
}
