import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart:ShoppingCart
  shipping = {};
  userSubscription:Subscription;
  userId: string;

  constructor(
            private router:Router,
            private authService:AuthService,
            private orderService:OrderService,) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(u => { this.userId = u.uid })
  }

  async placeOrder() {
    const order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key])
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}
