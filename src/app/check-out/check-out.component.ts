import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  cart:ShoppingCart;
  cartSubscription:Subscription; // TODO: use the async pipe

  constructor(private shoppingCartService:ShoppingCartService) {}

  async ngOnInit() {
    let cart = await this.shoppingCartService.getCart();
    this.cartSubscription = cart.snapshotChanges().subscribe(res=>{
      this.cart = this.shoppingCartService.angularFireActionToCartObject(res);
    })
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
