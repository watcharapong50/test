import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
            this.userService.deleteToken();
            this.userService.deletePermission();
            return false;
        } else if (!this.userService.getPermissionload()) {
            this.router.navigateByUrl('/starter');
            return false;
        }
        else
            return true;
    }
}
