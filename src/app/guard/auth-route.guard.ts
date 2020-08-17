import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserKey } from '../utils/types/sessionStorage';
import { Routes } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!JSON.parse(sessionStorage.getItem(UserKey))) {
      this.router.navigate([Routes.Lista], { queryParams: { login: true } });
      return false;
    } else {
      return true;
    }
  }
}
