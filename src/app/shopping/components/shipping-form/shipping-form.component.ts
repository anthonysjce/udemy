import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Shipping } from 'shared/models/shipping';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { Shoppingcart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping:Shipping ;
  userId:string;
  userSubscription:Subscription;
  @Input('cart')cart : Shoppingcart;
  constructor( private orderService:OrderService,
    private router:Router,private authService:AuthService) {
    this.shipping = new Shipping();
   }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  async placeOrder(){
    let order = new Order(this.userId,this.shipping,this.cart);
    /*// let order ={
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
    } */
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }
}
