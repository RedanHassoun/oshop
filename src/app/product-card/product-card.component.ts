import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product';
import { AppConsts } from '../common/appconsts';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions:boolean = true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  
  constructor(private cartService:ShoppingCartService) { } 
  
  addToCart(){
    this.cartService.addToCart(this.product);
  }
}
