
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from 'shared/model/app-user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AppConsts } from 'src/app/common/appconsts';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db:AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object(AppConsts.DB_USERS + '/' +user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid:string): Observable<AppUser>{
    return this.db.object(AppConsts.DB_USERS + '/' +uid)
      .valueChanges().pipe(
        map(user=>{
            let u:AppUser={
              name: user['name'],
              email: user['email'],
              isAdmin: user['isAdmin'],
            }; 
            return u;
        })
    );
  }
}
