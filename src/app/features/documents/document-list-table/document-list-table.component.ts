import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Document } from '../document.interface';
import { documentsMock } from '../mocks/document.mock';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-document-list-table',
  templateUrl: './document-list-table.component.html',
  styleUrls: ['./document-list-table.component.sass'],
})
export class DocumentListTableComponent implements AfterViewInit {
  documents$: Observable<Document[]> = of(documentsMock);
  displayedColumns: string[] = [
    'cardCode',
    'name',
    'createDate',
    'operationCode',
    'options',
  ];

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
