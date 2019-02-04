import { AppUser } from 'shared/model/app-user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
