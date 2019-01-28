import { Injectable } from '@angular/core';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireObject, AngularFireAction } from '@angular/fire/database';
import { AppConsts } from '../common/appconsts';
import { Product } from '../model/product';
import { take,map } from 'rxjs/operators';
import { Operation } from '../common/common.enums';
import { ShoppingCart } from '../model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // TODO: refactor the add to cart logic
  constructor(private db:AngularFireDatabase) { }

  addToCart(product: Product) {
    this.updateItem(product,Operation.ADD)
  }

  removeFromCart(product: Product): any {
    this.updateItem(product,Operation.REMOVE)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object(AppConsts.DB_SHOPPING_CARTS+'/'+cartId+'/items').remove()
  }

  angularFireActionToCartObject(action:AngularFireAction<DatabaseSnapshot<{}>>)
          :ShoppingCart{
      let obj = action.payload.val()
      if(!obj) throw new Error() // TODO: improve
      let cart:ShoppingCart = new ShoppingCart(action.payload.key,
                                               obj['items']); 
      return cart;
  }

  // TODO : continue
  async getCartObject(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object(AppConsts.DB_SHOPPING_CARTS + '/' + cartId)
            .snapshotChanges()
            .pipe(map(action=>{
              return this.angularFireActionToCartObject(action)
            }));
  }

  private async updateItem(theProduct:Product,op:Operation){
    let cartId = await this.getOrCreateCartId();
    let toAdd = (op === Operation.ADD) ? 1 : -1;
    const cartItemPath = AppConsts.DB_SHOPPING_CARTS + 
                        '/' + 
                        cartId + 
                        '/items/'+ 
                        theProduct.$key;
    let item$ = this.db.object(cartItemPath)
                        .snapshotChanges();
    item$.pipe(take(1))
      .subscribe((item)=>{
        if(item.payload.exists()){
          const itemFromPayload = this.getItemFromPayload(item.payload);

          if( (itemFromPayload.quantity + toAdd) === 0){
            this.db.object(cartItemPath).remove()
            return;
          }

          this.db.object(cartItemPath).update({
            title: theProduct.title,
            price: theProduct.price,
            imageURL: theProduct.imageURL,
            quantity: itemFromPayload.quantity + toAdd
          })
        }else{
          this.db.object(cartItemPath).set({
            title: theProduct.title,
            price: theProduct.price,
            imageURL: theProduct.imageURL,
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
