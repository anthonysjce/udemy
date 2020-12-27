import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Shoppingcart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  /* shipping:Shipping ; 
  userId:string; */
  cart:Shoppingcart;
  cartSubscription:Subscription;
 /*  userSubscription:Subscription; */
  constructor(private shoppingCartService:ShoppingCartService,
     /*  private orderService:OrderService, private authService:AuthService,
      private router:Router */) {
        /* this.shipping = new Shipping(); */
   }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart )
   /*  this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid); */
  }
  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    //this.userSubscription.unsubscribe();
  }

 
  /*async placeOrder(){
    let order = new Order(this.userId,this.shipping,this.cart);
    // let order ={
      datePlaced:new Date().getTime(),
      userId: this.userId,
      shipping:this.shipping,
      items:this.cart.items.map(i => {
        return {
          product:{
            title:i.title,
            imageUrl:i.imageUrl,
            price:i.price
          },
          quantity:i.quantity,
          totalPrice:i.totalPrice
        }
      })
    } //
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }*/
}
