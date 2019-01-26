import { Product } from "./product";

export class ShoppingCartItem{ 
    constructor(public product:Product,public quantity:number){
    }

    get totalPrice(){
        if(this.quantity == undefined || this.product == undefined)
            throw Error('The quantity and the product must be defined in the ShoppingCartItem')
        return this.quantity * this.product.price;
    }
}