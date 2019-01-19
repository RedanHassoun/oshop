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
  id:string;
  product:any = {};

  constructor(private categoryService:CategoryService,
             private route:ActivatedRoute,
             private router:Router,
             private productService:ProductService) { 
    this.categories$ = categoryService.getCategories()
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id) this.productService
          .get(this.id)
          .pipe(take(1))
          .subscribe(prod => {
            this.product = prod;
          })
  }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

}
