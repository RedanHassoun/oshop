import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$:Observable<any[]>;

  constructor(private categoryService:CategoryService,
             private router:Router,
             private productService:ProductService) { 
    this.categories$ = categoryService.getCategories()
  }

  ngOnInit() {
  }

  save(product){
    this.productService.create(product)
    .then(res=> this.router.navigate(['/admin/products']))
  }

}
