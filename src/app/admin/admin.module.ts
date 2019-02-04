import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DataTableModule } from 'angular-6-datatable';
import { RouterModule } from '@angular/router';
import { AuthGaurd } from 'shared/services/auth-gaurd.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGaurd, AdminAuthGuard]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGaurd,AdminAuthGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGaurd,AdminAuthGuard]},
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurd, AdminAuthGuard]}
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],providers:[
    AdminAuthGuard
  ]
})
export class AdminModule { }
