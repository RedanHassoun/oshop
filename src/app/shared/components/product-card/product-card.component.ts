import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/model/product';
import { AppConsts } from '../../../common/appconsts';
import { ShoppingCart } from 'shared/model/shopping-cart';

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
