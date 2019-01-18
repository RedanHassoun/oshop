import { Observable,of } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppConsts } from '../common/appconsts';
import { AppUser } from '../model/app-user';
import { switchMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private afAuth:AngularFireAuth,
              private userService:UserService,
              private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  login(){
    this.saveReturnUrl();
    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user =>{
        if(user) return this.userService.get(user.uid) 

        return of(null);
    }))
  }

  private saveReturnUrl(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem(AppConsts.KEY_RETURN_URL,returnUrl)
  }
}
