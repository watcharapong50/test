import { Component, OnInit } from '@angular/core';
import { MeterService } from "../../../../shared/meter.service";
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../../../shared/notification.service';
import { ManageMeterComponent } from "../manage-meter.component";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  searchKey: string;

  constructor(
    private meterService: MeterService,
    private notificationService: NotificationService,
    private manageMeterComponent:ManageMeterComponent
  ) { }


  ngOnInit() {
  }

  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form: NgForm) {
    this.meterService.postUser(form.value).subscribe(
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
    this.meterService.selectedUser = {
      Maddr: '',
      room:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
    this.manageMeterComponent.onLoad();
  }
}
