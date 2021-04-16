import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrackedTime } from '../models/tracked-time';
import { TrackedTimeService } from '../tracked-time.service';

@Component({
  selector: 'app-tracked-times-list',
  templateUrl: './tracked-times-list.component.html',
  styleUrls: ['./tracked-times-list.component.scss']
})
export class TrackedTimesListComponent implements OnInit {
  trackedTimes: TrackedTime[];
  displayedColumns: string[] = [
    'id',
    'description',
    'duration',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trackedTimeService: TrackedTimeService) { }

  ngOnInit(): void {
    this.getTrackedTimes();
  }

  getTrackedTimes(): void {
    this.trackedTimeService.getAllTrackedTimes().subscribe((trackedTimes) => {
      this.trackedTimes = trackedTimes;
      this.setDataSource();
    });
  }

  setDataSource(): void {
    this.dataSource = new MatTableDataSource(this.trackedTimes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
