import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$:Observable<any[]>;
  product:any = {};

  constructor(private categoryService:CategoryService,
             private route:ActivatedRoute,
             private router:Router,
             private productService:ProductService) { 
    this.categories$ = categoryService.getCategories()
    let id = this.route.snapshot.paramMap.get('id')
    if(id) this.productService
          .get(id)
          .pipe(take(1))
          .subscribe(prod => {
            this.product = prod;
          })
  }

  ngOnInit() {
  }

  save(product){
    this.productService.create(product)
    .then(res=> this.router.navigate(['/admin/products']))
  }

}
