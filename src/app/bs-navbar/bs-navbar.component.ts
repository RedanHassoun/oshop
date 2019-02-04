import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/model/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/model/shopping-cart';
import { ShoppingCartItem } from 'shared/model/shopping-cart-item';

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
