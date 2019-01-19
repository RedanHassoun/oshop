import { AppConsts } from './../common/appconsts';
import { AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list(AppConsts.DB_PRODUCTS).push(product);
  }

  getAll(){
    return this.db.list(AppConsts.DB_PRODUCTS).snapshotChanges()
      .pipe(map(action => 
        action.map(c => {
          const $key = c.payload.key;
          const data = { $key, ...c.payload.val() };
          return data;
        }) 
      ))
  }

  get(productId){
    return this.db
        .object(AppConsts.DB_PRODUCTS+'/'+productId).snapshotChanges()
        .pipe(map(action => { 
            const $key = action.payload.key;
            const data = { $key, ...action.payload.val() };
            return data; 
        }))
  }

  update(productId:string, product:any){
    return this.db.object(AppConsts.DB_PRODUCTS+'/'+productId)
           .update(product);
  }
}
