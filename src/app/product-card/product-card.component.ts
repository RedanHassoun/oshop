import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product';
import { AppConsts } from '../common/appconsts';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions:boolean = true;
  @Input('shopping-cart') shoppingCart:any;
  
  constructor(private cartService:ShoppingCartService) { } 
  
  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    
    let item =  this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
