import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    $key:string; 
    items: ShoppingCartItem[] = [];

    constructor(public key,
                public itemsMap:{[key:string]:ShoppingCartItem}){
        this.$key = key;
        this.populateItems(itemsMap);
    } 
    
    get totalItemsCount():number{
        let count = 0 
        for(let item in this.itemsMap){
            count+= this.itemsMap[item].quantity;
        }
        return count;
    }

    private populateItems(itemsMap:{[key:string]:ShoppingCartItem}){
        for(let productId in itemsMap){
            this.items.push(itemsMap[productId]);
        }
    }
}