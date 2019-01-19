import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  productsSub;
  products:Array<any>;

  constructor(private productService:ProductService) { 
    this.productsSub = productService.getAll()
                        .subscribe(res => {
                          this.products = res
                        })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
