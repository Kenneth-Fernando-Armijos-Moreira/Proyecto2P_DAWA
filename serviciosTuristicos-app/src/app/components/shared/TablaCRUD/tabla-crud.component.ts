import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tabla-crud',
  templateUrl: './tabla-crud.component.html',
  styleUrls: ['./tabla-crud.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, CommonModule, NgForOf, MatButtonModule]
})
export class TablaCrudComponent implements AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string }[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  get displayedColumns(): string[] {
    return this.columns.map(col => col.key).concat('actions');
  }

  ngAfterViewInit(): void {
    console.log(this.data);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  onEdit(row: any): void {
    this.edit.emit(row);
  }

  onDelete(row: any): void {
    this.delete.emit(row);
  }
}