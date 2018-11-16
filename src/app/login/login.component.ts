import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  model = {
    email: '',
    password: ''
  };
  serverErrorMessages: string;
  ngOnInit() {
    if (this.userService.isLoggedIn() && this.userService.getPermissionload())
      this.router.navigateByUrl('/starterAdmin');
    if (this.userService.isLoggedIn() && !this.userService.getPermissionload())
      this.router.navigateByUrl('/starter');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.userService.setPermission(res['permission']);
        if (!this.userService.getPermissionload()) {
          this.router.navigateByUrl('/starter');
        } else {
          this.router.navigateByUrl('/starterAdmin');
        }
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
