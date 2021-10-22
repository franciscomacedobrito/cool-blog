import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private zone: NgZone) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.authService.currentUser.pipe(filter(currentUser => !!currentUser)).subscribe(currentUser => {
        if (currentUser.isGuest) {
          resolve(true);
        } else {
          this.zone.run(() => {
            this.router.navigate(['posts']);
          });
          reject(false);
        }
      });
    });
  }
}
