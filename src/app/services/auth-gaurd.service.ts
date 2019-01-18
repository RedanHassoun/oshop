import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router) { }

  canActivate(){
    return true;
    // return this.authService.user$.pipe(map(user => {
    //   if(user) return true;

    //   this.router.navigate(['/login']);
    //   return false;
    // }))
    // return this.authService.user$.map(user=>{
    //   if(user) return true;

    //   this.router.navigate(['/login']);
    //   return false;
    // })
  }
}
