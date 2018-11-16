import { Component, OnInit, ViewChild } from '@angular/core';
import { MeterService } from "../../../shared/meter.service";
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from "../../../shared/notification.service";

@Component({
  selector: 'app-power-cut',
  templateUrl: './power-cut.component.html',
  styleUrls: ['./power-cut.component.css']
})
export class PowerCutComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meterService: MeterService,
    private notificationService: NotificationService
  ) { }
  dataSource;
  displayedColumns = ['room', 'Maddr', 'actions'];//, 'shortCircuit'
  ngOnInit() {
    this.meterService.showMeterRoom().subscribe(data => {
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


  showSucessMessage: boolean;
  serverErrorMessages: string;

  TestB(test) {

    this.meterService.powerCut(test).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.notificationService.success('Edit successfully !!!');
        this.ngOnInit();

      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.notificationService.warn('Edit Fail!!!');
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }
}
