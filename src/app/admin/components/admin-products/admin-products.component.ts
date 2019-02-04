import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'shared/model/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  productsSub:Subscription;
  products:Array<Product>;
  filteredProducts:Array<Product>;
  // TODO: Improve the price sorting, and check if the filtering mechanism can be improved.

  constructor(private productService:ProductService) { 
    this.productsSub = productService.getAll()
                        .subscribe(res => {
                          this.filteredProducts = this.products = res
                        })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts = (query) ? 
        this.products.filter(p => 
                      p.title.toLowerCase()
                      .includes(query.toLowerCase())) : 
        this.products
  }
}
