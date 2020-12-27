import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Shoppingcart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) 
  { 

  }
  private create(){   
      return this.db.list('/shopping-carts').push({dateCreated:new Date().getTime()});  
  }
  async getCart():Promise<Observable<Shoppingcart>>{
    let cartId = await this.getOrCreateCartID();
     return this.db.object('/shopping-carts/'+cartId).map(x =>new Shoppingcart(x.items))
  }
  private getItem(cartId:string,productKey:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productKey);
  }
  private async getOrCreateCartID():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId)
      return cartId;
      /* this.create().then(result=>{
        localStorage.setItem('cartId',result.key);
        return this.getCart(result.key);
      }) */
      //chaning to async to look like sync
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;     
  }
  async addToCart(product:Product){
   /*  let cartId = await this.getOrCreateCartID();
    let item$ = this.getItem(cartId,product.$key);
    item$.take(1).subscribe(item =>{
      if(item.$exists())
        item$.update({quantity:item.quantity + 1})
      else
        item$.set({product:product,quantity:1})
    }) */
    this.updateItemQuantity(product,1);
  }
  removeFromCart(product:Product){
    this.updateItemQuantity(product,-1);
  }
  private async updateItemQuantity(product:Product,change:number){
    let cartId = await this.getOrCreateCartID();
    let item$ = this.getItem(cartId,product.$key);
    item$.take(1).subscribe(item =>{
      let quantity = (item.quantity || 0) + change;
      if(quantity === 0)
        item$.remove();
      else{
        item$.update({title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,          
          quantity:quantity}); 
      }             
    })
  }
  private async updateItemQuantityOLD(product:Product,change:number){
    let cartId = await this.getOrCreateCartID();
    let item$ = this.getItem(cartId,product.$key);
    item$.take(1).subscribe(item =>{
      if (item.quantity === 0){
        item$.remove();
        return;
      }
       
      if(item.$exists())
        item$.update({quantity:item.quantity + change})
      else{
        //item$.set({product:product,quantity:1})//this is for creating new item
        item$.set({title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,          
          quantity:1})
      }
        
    })

  }
  async clearCart(){
    let cartId = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }
}
