import { Component, OnInit, ViewChild } from '@angular/core';
import { MeterService } from "../../shared/meter.service";
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from "../../shared/notification.service";
import { UserService } from "../../shared/user.service";

@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meterService: MeterService,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }
  dataSource;
  displayedColumns = ['username', 'room', 'actions'];//, 'shortCircuit'
  ngOnInit() {
    this.userService.getAllUser().subscribe(data => {
      if (!data) {
        return;
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  searchKey: string;
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
}
