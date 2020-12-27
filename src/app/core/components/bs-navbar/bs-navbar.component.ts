import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app.user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { Shoppingcart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  //user$: Observable<firebase.User>;
  appUser:AppUser;
  //shoppingCartItemCount:number = 0;
  cart$:Observable<Shoppingcart>
  constructor(/* private afAuth:AngularFireAuth */
  /* public */ private auth:AuthService,private cartService:ShoppingCartService) { 
   // afAuth.authState.subscribe(param=>this.user = param);
   //this.user$ = afAuth.authState;
   //need not have to unsuncribe becuase nav bar only gets created once in our application 
    /* auth.appUser$.subscribe(appUser =>{
      this.appUser = appUser;
      confirm('recieved appUser');     
    }); */
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser =>{
      this.appUser = appUser;
      //confirm('recieved appUser');     
    });

    this.cart$= await this.cartService.getCart();
   
   //cart$.subscribe(cart => { we are not going to subccribe also 
    /*this.shoppingCartItemCount = 0;
      let items:ShoppingCartItem[] = cart.items;
     for(let productKey in items){
      let quantity:number = items[productKey].quantity;
      this.shoppingCartItemCount = this.shoppingCartItemCount + quantity;
     } */
   //})
  }

  logout(){
    //this.afAuth.auth.signOut();
    this.auth.logout();
  }
  showCart(){
    let location = window.location.href;
    console.log('location ='+location);
    location = location+'shopping-cart';
    console.log('location ='+location);
    window.open(location);

  }
}
