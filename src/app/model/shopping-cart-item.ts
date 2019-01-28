import { Product } from "./product";

export class ShoppingCartItem{ 
    $key:string;
    title:string;
    price:number;
    imageURL:string;
    quantity:number;

    constructor(init?:Partial<ShoppingCartItem>){
        Object.assign(this,init);
    }
    
    get totalPrice(){
        if(this.quantity == undefined || this.price == undefined)
            throw Error('The quantity and the price must be defined in the ShoppingCartItem')
        return this.quantity * this.price;
    }
}