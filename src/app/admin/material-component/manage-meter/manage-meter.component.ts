import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MeterService } from "../../../shared/meter.service";
import { NotificationService } from "../../../shared/notification.service";
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-manage-meter',
  templateUrl: './manage-meter.component.html',
  styleUrls: ['./manage-meter.component.css']
})
export class ManageMeterComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private meterService: MeterService,
    private notificationService: NotificationService,
    public dialogMeter: MatDialog
  ) { }

  dataSource;
  displayedColumns = ['Maddr', 'room', 'date', 'actions'];

  searchKey: string;
  dialog: any;
  ngOnInit() {
    this.meterService.showAllMeter().subscribe(data => {
      if (!data) {
        return;
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    })
  }

  userDetails;
  onDelete(Maddr: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.meterService.deleteMeter(Maddr).subscribe(
        res => {
          this.userDetails = res['user'];
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
      this.notificationService.success('! Deleted successfully');
    }

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  onLoad() {
    this.ngOnInit();
  }

  Maddr: string;
  status: string;
  timeDelay: string;
  room: string
  openDialog(element): void {
    this.Maddr = element.Maddr
    this.status = element.status
    this.timeDelay = element.timeDelay
    this.room = element.room

    let dialogRef = this.dialogMeter.open(DialogOverviewExampleDialogMeter, {
      width: '60%',
      data: {
        Maddr: this.Maddr,
        status: this.status,
        timeDelay: this.timeDelay,
        room: this.room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog-admin',
  templateUrl: './edit.html'
})
export class DialogOverviewExampleDialogMeter {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogMeter>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meterService: MeterService,
    private notificationService: NotificationService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data);

  }
  onClear() {
    this.dialogRef.close();
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form: NgForm) {
    this.meterService.updateMeter(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.notificationService.success('Edit successfully !!!');
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
    this.dialogRef.close();
  }
}