import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports:[
    BsNavbarComponent
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ]
})
export class CoreModule { }
