import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-headerAdmin',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponentAdmin implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onLogout() {
    this.userService.deleteToken();
    this.userService.deletePermission();
    this.router.navigate(['/login']);
  }
}
