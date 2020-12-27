import { Component, OnInit, Input} from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Shoppingcart } from 'shared/models/shopping-cart';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('show-add') showAdd = true;
  @Input('shopping-cart') shoppinCart:Shoppingcart;
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }
  addToCart(/* product:Product */){
    this.cartService.addToCart(this.product);
  } 
 /*  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  } */
  /* getQuantity(){
    if(!this.shoppinCart)
      return 0;
      //let item = this.shoppinCart.items[this.product.$key];
      let item = this.shoppinCart.itemsMap[this.product.$key];

      return item ? item.quantity : 0;
  } */
}
