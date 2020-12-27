import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router,RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuardService {

  constructor( private auth:AuthService, private route:Router) { }
  
  canActivate(route,state:RouterStateSnapshot){
    return this.auth.user$.map(user=>{
      if(user) return true;
      
      // send them to Login page
      this.route.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
    })
  }

}
