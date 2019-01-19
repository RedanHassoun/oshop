import { AppConsts } from './../common/appconsts';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories(){
    // return this.db.list(AppConsts.DB_CATEGORIES,
    //                     ref => ref.orderByChild('name'))
    //                 .snapshotChanges()
    //                 .pipe(map(changes=>{
    //                 }));
    return this.db.list(AppConsts.DB_CATEGORIES,ref => ref.orderByChild('name'))
                  .valueChanges()
  }
}
