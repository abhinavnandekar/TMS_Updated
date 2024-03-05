import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const redirectedInternally = state.root.queryParamMap.has('internalRedirect');

    if (redirectedInternally) {
      return true;
    } else {
      return this.router.createUrlTree(['/login/login']);
    }
  }
}
