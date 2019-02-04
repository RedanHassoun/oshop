import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'shared/model/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[];
  category:string;
  cart:any; // TODO: use the async pipe
  subscription:Subscription;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    // Do some refactoring
    this.productService
    .getAll()
    .pipe(switchMap(p => {
      this.products = p;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');
      
      /* Refresh filtered products */
      this.filteredProducts = (this.category) ? 
        this.filteredProducts = this.products.filter(p=> p.category === this.category) :
        this.products;
    });

    let cart = await this.shoppingCartService.getCart();
    this.subscription = cart.snapshotChanges()
      .subscribe(res=>{
        this.cart = this.shoppingCartService.angularFireActionToCartObject(res);      
    })
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe()
  }
}
