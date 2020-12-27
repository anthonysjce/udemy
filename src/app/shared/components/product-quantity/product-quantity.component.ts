import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { Shoppingcart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product:Product; 
  @Input('shopping-cart') shoppinCart:Shoppingcart;
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }
  addToCart(/* product:Product */){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
  //moving to shopping cart as per oops Information expert principle
 /*  getQuantity(){
    if(!this.shoppinCart)
      return 0;
      //let item = this.shoppinCart.items[this.product.$key];
      let item = this.shoppinCart.itemsMap[this.product.$key];

      return item ? item.quantity : 0;
  } */
}
