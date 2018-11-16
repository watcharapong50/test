import { Component, OnInit } from '@angular/core';
import { MeterService } from "../../../shared/meter.service";
import { NotificationService } from "../../../shared/notification.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {

  constructor(
    private meterService: MeterService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }
  userDetails;
  ngOnInit() {
    this.meterService.showTimeDelay().subscribe(
      res => {
        this.userDetails = res[0].timeDelay;
      },
      err => {
        console.log(err);
      }

    );
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  time(time) {
    this.meterService.updateSystem(time).subscribe(
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
