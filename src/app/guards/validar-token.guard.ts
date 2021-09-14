import { Injectable, Pipe } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
  
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private AuthService: AuthService,
              private router:Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this.AuthService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
  canLoad():Observable<boolean> | boolean {
    console.log('canload');
    return this.AuthService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
