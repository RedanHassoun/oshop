import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppConsts } from '../common/appconsts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list(AppConsts.DB_PRODUCTS).push(product);
  }
}
