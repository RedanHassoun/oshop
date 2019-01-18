import { Observable } from 'rxjs/internal/Observable';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$:Observable<any[]>;

  constructor(private categoryService:CategoryService) { 
    this.categories$ = categoryService.getCategories()
  }

  ngOnInit() {
  }

  save(product){
    console.log(product);
  }

}
