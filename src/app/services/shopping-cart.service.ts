import { Injectable } from '@angular/core';
import { AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { AppConsts } from '../common/appconsts';
import { Product } from '../model/product';
import { take } from 'rxjs/operators';

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

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object(AppConsts.DB_SHOPPING_CARTS + '/' + cartId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem(AppConsts.KEY_CART_ID);
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem(AppConsts.KEY_CART_ID,result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    const cartItemPath = AppConsts.DB_SHOPPING_CARTS + 
                        '/' + 
                        cartId + 
                        '/items/'+ 
                        product.$key;
    let item$ = this.db.object(cartItemPath)
                        .snapshotChanges();
    item$.pipe(take(1))
      .subscribe((item)=>{
        if(item.payload.exists()){
          const itemFromPayload = this.getItemFromPayload(item.payload);
          this.db.object(cartItemPath).update({
            quantity: itemFromPayload.quantity + 1
          })
        }else{
          this.db.object(cartItemPath).set({
            quantity: 1
          })
        }
      })
  }

  private getItemFromPayload(payload:DatabaseSnapshot<{}>){
    let obj = payload.val()
    let item = {
      quantity: obj['quantity']
    }
    return item;
  }
}
