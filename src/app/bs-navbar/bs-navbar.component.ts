import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../model/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser:AppUser;
  cartItemsCounter:number;
  
  constructor(private shoppingCartService:ShoppingCartService,
              private authService:AuthService) {
    
  }

  async ngOnInit(){
    this.authService.appUser$.subscribe(user=> this.appUser = user);
    let cart = await this.shoppingCartService.getCart();
    cart.snapshotChanges()
      .subscribe(res=>{
        let cart = this.shoppingCartService.angularFireActionToCartObject(res);
        this.cartItemsCounter = cart.totalItemsCount;          
      })
  }
 
  logout() {
    this.authService.logout();
  }
}
