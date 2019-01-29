import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppConsts } from '../common/appconsts';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) { }

  storeOrder(order){
    return this.db.list(AppConsts.DB_ORDERS).push(order);
  }
}
