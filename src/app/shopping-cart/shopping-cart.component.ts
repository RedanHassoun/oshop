import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    let cart = await this.shoppingCartService.getCart()
    this.cart$ = cart.snapshotChanges()
        .pipe(map(action=>{
          return this.shoppingCartService.angularFireActionToCartObject(action);
        }))
  }

}
