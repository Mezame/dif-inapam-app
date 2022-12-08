import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Document } from '@features/documents/document.interface';
import { documentsMock } from '@features/documents/mocks/document.mock';
import {
  getMonthsNumbers,
  getMonthsWords,
} from '@features/documents/utils/get-create-date-months';
import { getSelectOptions } from '@shared/get-select-options';
import { MonthNumber } from '@shared/month-number.type';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent {
  documents$: Observable<Document[]> = of(documentsMock);
  monthsOptions = getSelectOptions(
    getMonthsNumbers(this.documents$),
    getMonthsWords(this.documents$)
  ).reverse();
  selectedMonth = this.monthsOptions[0].value as MonthNumber;
}
