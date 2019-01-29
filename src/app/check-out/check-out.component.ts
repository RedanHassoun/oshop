import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';
import { Order } from '../model/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  shipping = {};
  cart:ShoppingCart;
  cartSubscription:Subscription;
  userSubscription:Subscription;
  userId: string;

  constructor(
          private authService:AuthService,
          private orderService:OrderService,
          private shoppingCartService:ShoppingCartService) {}

  async ngOnInit() {
    let cart = await this.shoppingCartService.getCart();
    this.cartSubscription = cart.snapshotChanges().subscribe(res=>{
      this.cart = this.shoppingCartService.angularFireActionToCartObject(res);
    })
    
    this.userSubscription = this.authService.user$.subscribe(u => { this.userId = u.uid })
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe()
  }

  placeOrder() {
    const order = new Order(this.userId,this.shipping,this.cart);
    this.orderService.storeOrder(order);
  }
}
