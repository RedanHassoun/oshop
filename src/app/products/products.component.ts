import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category:string;

  constructor(
              private route:ActivatedRoute,
              private productService:ProductService,
              private categoryService:CategoryService) { 
    productService
      .getAll()
      .pipe(switchMap(p => {
        this.products = p;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        
        /* Refresh filtered products */
        this.filteredProducts = (this.category) ? 
          this.filteredProducts = this.products.filter(p=> p.category === this.category) :
          this.products;
      }); 
    this.categories$ = categoryService.getAll();
  }
}
