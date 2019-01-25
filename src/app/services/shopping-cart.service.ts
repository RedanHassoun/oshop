import { Injectable } from '@angular/core';
import { AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { AppConsts } from '../common/appconsts';
import { Product } from '../model/product';
import { take } from 'rxjs/operators';
import { Operation } from '../common/common.enums';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // TODO: refactor the add to cart logic
  constructor(private db:AngularFireDatabase) { }

  addToCart(product: Product) {
    this.modifyCartQuantity(product,Operation.ADD)
  }

  removeFromCart(product: Product): any {
    this.modifyCartQuantity(product,Operation.REMOVE)
  }

  private async modifyCartQuantity(product:Product,op:Operation){
    let cartId = await this.getOrCreateCartId();
    let toAdd = (op === Operation.ADD) ? 1 : -1;
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
          if( (itemFromPayload.quantity + toAdd) < 0)
            throw new Error("Quantity can't be negative");

          this.db.object(cartItemPath).update({
            quantity: itemFromPayload.quantity + toAdd
          })
        }else{
          this.db.object(cartItemPath).set({
            quantity: 1
          })
        }
      })
  }

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

  private getItemFromPayload(payload:DatabaseSnapshot<{}>){
    let obj = payload.val()
    let item = {
      quantity: obj['quantity']
    }
    return item;
  }
}
