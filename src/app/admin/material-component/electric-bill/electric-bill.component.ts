import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-electric-bill',
  templateUrl: './electric-bill.component.html',
  styleUrls: ['./electric-bill.component.css']
})
export class ElectricBillComponent implements OnInit {

  userDetails;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'].room;
        this.meter(this.userDetails)
      },
      err => {
        console.log(err);
      }
    );
  }
  Maddr;
  meter(room) {
    console.log(room);
    this.userService.MacFromRoom(room).subscribe(
      res => {
        this.Maddr = res['Maddr'];
      },
      err => {
        console.log(err);
      }
    );
  }
}
