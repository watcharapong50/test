import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { MeterService } from '../../shared/meter.service';
import { Router } from "@angular/router";
import { Chart } from "chart.js";

@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  userDetails;
  roomName;
  constructor(private userService: UserService, private router: Router, private meterService: MeterService) { }
  LineChart = [];

  // LineVoltage
  // Frequency
  // ActiveEnergy
  // LineCurrent

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.roomName = res['user'].room;
        this.userDetails = res['user'];
        this.getmeter(this.roomName)
      },
      err => {
        console.log(err);
      }
    );
    this.LineVoltage();
    this.ActiveEnergy();
    this.Frequency();
    this.LineCurrent();
  }

  Maddr = 'none';
  getmeter(room) {
    this.userService.MacFromRoom(room).subscribe(
      res => {
        this.Maddr = res['Maddr'];
        this.getElec(this.Maddr)
        this.elecData(this.Maddr)
      },
      err => {
        console.log(err);
      }
    );
  }
  date
  elecData(meter) {
    this.meterService.showMyElec(meter).subscribe(
      res => {

        let ActiveEnergy = Object.keys(res).map(function (personNamedIndex) {
          let data = res[personNamedIndex];
          return data.ActiveEnergy;
        });
        let Frequency = Object.keys(res).map(function (personNamedIndex) {
          let data = res[personNamedIndex];
          return data.Frequency;
        });
        let LineCurrent = Object.keys(res).map(function (personNamedIndex) {
          let data = res[personNamedIndex];
          return data.LineCurrent;
        });
        let LineVoltage = Object.keys(res).map(function (personNamedIndex) {
          let data = res[personNamedIndex];
          return data.LineVoltage;
        });
        let date = Object.keys(res).map(function (personNamedIndex) {
          let data = res[personNamedIndex];
          return data.date;
        });
        console.log(ActiveEnergy);
        console.log(Frequency);
        console.log(LineCurrent);
        console.log(LineVoltage);
        console.log(date);
        // ActiveEnergy
        this.LineChart = new Chart("ActiveEnergy", {
          type: 'line',
          data: {
            labels: date,//[1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
              data: ActiveEnergy,//[40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
              label: "ActiveEnergy",
              borderColor: "#e8c3b9",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'ActiveEnergy (W)'
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY'
                  }
                }
              }]
            }
          }
        });
        // Frequency
        this.LineChart = new Chart("Frequency", {
          type: 'line',
          data: {
            labels: date,// [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
              data: Frequency,// [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
              label: "Frequency",
              borderColor: "#3cba9f",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Frequency (Hz)'
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY'
                  }
                }
              }]
            }
          }
        });
        // LineCurrent
        this.LineChart = new Chart("LineCurrent", {
          type: 'line',
          data: {
            labels: date,// [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
              data: LineCurrent,//[282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
              label: "LineCurrent",
              borderColor: "#8e5ea2",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'LineCurrent (A)'
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY'
                  }
                }
              }]
            }
          }
        });
        // LineVoltage
        this.LineChart = new Chart("LineVoltage", {
          type: 'line',
          data: {
            labels: date,//[1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
              data: LineVoltage,//[86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
              label: "LineVoltage",
              borderColor: "#3e95cd",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'LineVoltage (V)'
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY'
                  }
                }
              }]
            }
          }
        });
      },
      err => {
        console.log(err);
      })
  }

  lastFullTime = 0; startFullTime = 0;
  getElec(data) {
    this.userService.showBillUser(data).subscribe(
      res => {
        this.lastFullTime = res['lastFullTime'].ActiveEnergy;
        this.startFullTime = res['startFullTime'].ActiveEnergy;
      },
      err => {
        console.log(err);
      }
    )
  }
  LineVoltage() {
    // this.LineChart = new Chart("LineVoltage", {
    //   type: 'line',
    //   data: {
    //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    //     datasets: [{
    //       data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
    //       label: "Africa",
    //       borderColor: "#3e95cd",
    //       fill: false
    //     }
    //     ]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'LineVoltage (V)'
    //     }
    //   }
    // });
  }
  LineCurrent() {
    // this.LineChart = new Chart("LineCurrent", {
    //   type: 'line',
    //   data: {
    //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    //     datasets: [{
    //       data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
    //       label: "Asia",
    //       borderColor: "#8e5ea2",
    //       fill: false
    //     }
    //     ]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'LineCurrent (A)'
    //     }
    //   }
    // });
  }
  Frequency() {
    // this.LineChart = new Chart("Frequency", {
    //   type: 'line',
    //   data: {
    //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    //     datasets: [{
    //       data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
    //       label: "Europe",
    //       borderColor: "#3cba9f",
    //       fill: false
    //     }
    //     ]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'Frequency (Hz)'
    //     }
    //   }
    // });
  }
  ActiveEnergy() {
    // this.LineChart = new Chart("ActiveEnergy", {
    //   type: 'line',
    //   data: {
    //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    //     datasets: [{
    //       data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
    //       label: "Latin America",
    //       borderColor: "#e8c3b9",
    //       fill: false
    //     }
    //     ]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'ActiveEnergy (W)'
    //     }
    //   }
    // });
  }
}


