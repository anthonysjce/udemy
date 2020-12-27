 import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService,private route:Router,private userService:UserService){
    auth.user$.subscribe(user=>{
      if(user)
        userService.save(user);//ideally we should save this user on Registration

     let returnUrl = localStorage.getItem('returnUrl');
     if(returnUrl){
        localStorage.removeItem('returnUrl');
        this.route.navigateByUrl(returnUrl);
     }
      

    })
  }
}
