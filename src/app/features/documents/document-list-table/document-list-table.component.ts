import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../document.interface';

@Component({
  selector: 'app-document-list-table',
  templateUrl: './document-list-table.component.html',
  styleUrls: ['./document-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListTableComponent implements OnInit {
  displayedColumns!: string[];

  @Input('data') documents$!: Observable<Document[]>;

  ngOnInit(): void {
    this.displayedColumns = [
      'cardCode',
      'name',
      'createDate',
      'operationCode',
      'options',
    ];
  }
}
