import { UserService } from './services/user.service';
import { AppConsts } from './common/appconsts';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService,
              private router:Router,
              private userService:UserService){
    authService.user$.subscribe( user => {
      if(user){
        userService.save(user);
        let retUrl = localStorage.getItem(AppConsts.KEY_RETURN_URL);
        router.navigateByUrl(retUrl);
      }
    })
  }

}
