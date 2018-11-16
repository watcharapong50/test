import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserService } from "../../../shared/user.service";
import { Observable } from "rxjs/Observable";
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../../shared/notification.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource;
  displayedColumns = ['username', 'firstname', 'lastname', 'email', 'room', 'permission', 'date', 'actions'];

  searchKey: string;
  dialog: any;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    public dialog2: MatDialog
  ) { }
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

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
    this.notificationService.success('Create successfully !!!');
    this.ngOnInit();
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      room: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  userDetails;
  onDelete(username: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.userService.deleteUserProfile(username).subscribe(
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

  username: string;
  firstname: string;
  lastname: string;
  email: string;
  room: string;
  permission: string;
  Maddr: string;

  openDialog(element): void {
    this.username = element.username
    this.firstname = element.firstname
    this.lastname = element.lastname
    this.email = element.email
    this.room = element.room
    this.permission = element.permission
    this.Maddr = element.Maddr

    let dialogRef = this.dialog2.open(DialogOverviewExampleDialog2, {
      width: '60%',
      data: {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        room: this.room,
        permission: this.permission,
        Maddr: this.Maddr,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create.html'
})
export class DialogOverviewExampleDialog2 {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  permission = 'admin';

  departments = [
    { Maddr: 'Dep 1' },
    { Maddr: 'Dep 2' },
    { Maddr: 'Dep 3' }];

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClear() {
    this.dialogRef.close();
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form: NgForm) {
    this.userService.updateUserProfile(form.value).subscribe(
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