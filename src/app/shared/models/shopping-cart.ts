import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class Shoppingcart{
    //items:ShoppingCartItem[];// we have defined this constructor
    
    /* constructor (public items:ShoppingCartItem[] ){

    } */
    items:ShoppingCartItem[] = [];
    constructor (private itemsMap:{[productID:string]:ShoppingCartItem} ){
        for(let productID in itemsMap){
            let item =  itemsMap[productID];
           /*  let x = new ShoppingCartItem()
            Object.assign(x,item);
            x.$key = productID; */
            //Another method of Object initialization
            let x = new ShoppingCartItem({...item,$key:productID})
            this.items.push(x);
        }
           
    }
   /*  get productIds(){
        return Object.keys(this.items);
    } */
    get totalItemsCount(){
        let count = 0;
        for(let productKey in this.items){
        let quantity:number = this.items[productKey].quantity;
        count +=  quantity;
        }
        return count;
    }
    get totalPrice(){
        let sum:number = 0;
        for(let productID in this.items){
            let item =  this.items[productID];
            sum += item.totalPrice;
        }
        return sum;
    }
    getQuantity(product:Product){
        /* if(!this.shoppinCart)
          return 0; */
          //let item = this.shoppinCart.items[this.product.$key];
          if(!this.itemsMap)
            return 0;
          let item = this.itemsMap[product.$key];
    
          return item ? item.quantity : 0;
      }
}