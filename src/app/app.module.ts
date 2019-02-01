import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGaurd } from './services/auth-gaurd.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from "angular-6-datatable";
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductsFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
    DataTableModule,
    FormsModule,
    RouterModule.forRoot([
      /* Anonymous users */
      { path: '', component: ProductsComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { path: 'login', component: LoginComponent},
      
      /* Normal users */
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGaurd]},
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGaurd]},
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGaurd]},
      
      /* Admins */
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGaurd, AdminAuthGuard]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGaurd,AdminAuthGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGaurd,AdminAuthGuard]},
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurd, AdminAuthGuard]}
    ])
  ],
  providers: [
    AuthService,
    AuthGaurd,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
