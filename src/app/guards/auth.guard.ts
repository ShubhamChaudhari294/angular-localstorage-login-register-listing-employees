import { RouterStateSnapshot, Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.service';
@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router, public alert: AlertService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isLoggedin = localStorage.getItem('isLoggedIn');
        if (isLoggedin === 'true') {
            return true;
        }
        this.alert.openSnackBar('Login to proceed', '')
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}