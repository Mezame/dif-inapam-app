import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../document.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-document-list-table',
  templateUrl: './document-list-table.component.html',
  styleUrls: ['./document-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'cardCode',
    'name',
    'createDate',
    'operationCode',
    'options',
  ];

  @Input('data') documents$!: Observable<Document[]>;

  @ViewChild(MatTable)
  table!: MatTable<Document>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    const dataSource = new MatTableDataSource<Document>(
      this.table.dataSource as Document[]
    );
    dataSource.paginator = this.paginator;
    this.table.dataSource = dataSource;
  }
}
