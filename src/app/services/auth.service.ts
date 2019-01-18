import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppConsts } from '../common/appconsts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private afAuth:AngularFireAuth,
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

  private saveReturnUrl(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem(AppConsts.KEY_RETURN_URL,returnUrl)
  }
}
