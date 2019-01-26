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

    get totalPrice():number{
        let totalPrice:number = 0;
        for(let item of this.items)
            totalPrice += item.totalPrice
        
        return totalPrice
    }

    private populateItems(itemsMap:{[key:string]:ShoppingCartItem}){
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product,item.quantity));
        }
    }
}