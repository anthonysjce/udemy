import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService) {

  }
  canActivate(route,state:RouterStateSnapshot): Observable<boolean> {
    // if dont return then x will be void . 
    //if we return x will be Obeservable again
    /* this.auth.user$.map(user=>{
      return this.userService.get(user.uid)
    }).subscribe(x=>console.log(x))     */
  /* return  this.auth.user$.switchMap(user=>{
      return this.userService.get(user.uid)
    }).map(appUser=>appUser.isAdmin) ; // get converted boolean observable */
    //Above code is cleaned up as below
    return  this.auth.user$
    .switchMap(user=>this.userService.get(user.uid))
    .map(appUser=>appUser.isAdmin) ;  
    
  }
}
