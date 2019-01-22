import { AppConsts } from './../common/appconsts';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getAll(){
    // return this.db.list(AppConsts.DB_CATEGORIES,
    //                     ref => ref.orderByChild('name'))
    //                 .snapshotChanges()
    //                 .pipe(map(changes=>{
    //                 }));
    return this.db.list(AppConsts.DB_CATEGORIES,ref => ref.orderByChild('name'))
                  .valueChanges()
  }
  // TODO : use this
  private extractProductFromDBSnapshot(angularAction:AngularFireAction<DatabaseSnapshot<{}>>){
    const $theKey = angularAction.payload.key;
    const obj = angularAction.payload.val()
    let category = {
      $key: $theKey,
      key: obj['key'],
      name: obj['name']
    }
    return category;
  }
}
