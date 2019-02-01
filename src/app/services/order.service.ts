import { AppConsts } from './../common/appconsts';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../model/order';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,
              private shoppingCartService:ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list(AppConsts.DB_ORDERS).push(order);
    await this.shoppingCartService.clearCart();
    return result
  }

  getAll():Observable<Order>{
    return this.db.list(AppConsts.DB_ORDERS)
              .snapshotChanges()
              .pipe(switchMap(res=>{ 
                return this.extractOrdersFromSnapshot(res);
              }))
  }

  getOrdersByUser(uid:string){
    this.db.list(AppConsts.DB_ORDERS, ref=>ref.orderByChild('userId').equalTo(uid))
        //.snapshotChanges()
        // .pipe(switchMap(res=>{
        //   return this.extractOrdersFromSnapshot(res);
        // }))
  }

  private extractOrdersFromSnapshot(s: AngularFireAction<DatabaseSnapshot<{}>>[]){
    let orders:Order[] = []
    for(let action of s){
      orders.push(this.angularFireActionToOrderObject(action))
    }
    return orders;
  }

  private angularFireActionToOrderObject(action:AngularFireAction<DatabaseSnapshot<{}>>)
                                      :Order{
      let obj = action.payload.val()

      let order:Order = {
        datePlaced: obj['datePlaced'],
        userId: obj['userId'],
        items: obj['category'],
        shipping: obj['shipping']
      }
      return order;
  }
}
