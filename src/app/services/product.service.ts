import { AppConsts } from './../common/appconsts';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Product } from '../model/product';

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
          return this.extractProductFromDBSnapshot(c);
        }) 
      ))
  }

  get(productId){
    return this.db
        .object(AppConsts.DB_PRODUCTS+'/'+productId).snapshotChanges()
        .pipe(map(action => { 
            return this.extractProductFromDBSnapshot(action);
        }))
  }

  update(productId:string, product:any){
    return this.db.object(AppConsts.DB_PRODUCTS+'/'+productId)
           .update(product);
  }

  delete(productId:string){
    return this.db.object(AppConsts.DB_PRODUCTS+'/'+productId)
            .remove();
  }

  private extractProductFromDBSnapshot(
      angularAction:AngularFireAction<DatabaseSnapshot<{}>>):Product{
    const $theKey = angularAction.payload.key;
    const obj = angularAction.payload.val()
    let product:Product = {
      $key: $theKey,
      title: obj['title'],
      price: obj['price'],
      category: obj['category'],
      imageURL: obj['imageURL']
    }
    return product;
  }
}
