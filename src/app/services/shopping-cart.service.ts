import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppConsts } from '../common/appconsts';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db:AngularFireDatabase) { }

  private create() {
    return this.db.list(AppConsts.DB_SHOPPING_CARTS).push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string){
    return this.db.object(AppConsts.DB_SHOPPING_CARTS + '/' + cartId);
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem(AppConsts.KEY_CART_ID);
    if(!cartId){
      let result = await this.create();
      localStorage.setItem(AppConsts.KEY_CART_ID,result.key);
      return this.getCart(result.key); 
    }
    return this.getCart(cartId);
  }

  addToCart(product: Product) {
  }
}
