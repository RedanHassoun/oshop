import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart{
    $key:string; 
    items: ShoppingCartItem[] = [];

    constructor(public key,
                public itemsMap:{[key:string]:ShoppingCartItem}){
        this.itemsMap = itemsMap || {};
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

    getQuantity(product:Product){ 
        if(!this.items) return 0;
        
        let item =  this.itemsMap[product.$key];
        return item ? item.quantity : 0;
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
            this.items.push(new ShoppingCartItem({...item,$key: productId}));
        }
    }
}