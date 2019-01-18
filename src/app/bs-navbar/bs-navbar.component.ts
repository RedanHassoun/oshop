import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../model/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:AppUser;
  
  constructor(private authService:AuthService) {
    authService.appUser$.subscribe(user=> this.appUser = user);
  }
 
  logout() {
    this.authService.logout();
  }
}
