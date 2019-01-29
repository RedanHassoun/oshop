import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppConsts } from '../common/appconsts';

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
}
