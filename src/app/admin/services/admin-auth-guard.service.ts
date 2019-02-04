import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private authService:AuthService,
              private userService:UserService) { }

  canActivate():Observable<boolean>{
    return this.authService.appUser$
        .pipe(map(user=>{ return user.isAdmin}))
  }
}
