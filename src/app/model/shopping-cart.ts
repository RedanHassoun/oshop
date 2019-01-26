import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    $key:string;
    items:ShoppingCartItem[];

    get productIds(){
        return Object.keys(this.items)
    }

    get totalItemsCount():number{
        let count = 0 
        for(let item in this.items){
            count+= this.items[item].quantity;
        }
        return count;
    }
}