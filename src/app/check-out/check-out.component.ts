import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$:Observable<ShoppingCart>; 

  constructor(private shoppingCartService:ShoppingCartService) {}

  async ngOnInit() {
    let cart = await this.shoppingCartService.getCart();
    this.cart$ = cart.snapshotChanges()
          .pipe(map(res=>{
              return this.shoppingCartService
                .angularFireActionToCartObject(res);
         }))
  }
}
