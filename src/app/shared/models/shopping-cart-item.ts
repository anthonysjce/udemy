import { Product } from "./product";

export class ShoppingCartItem{
   /*  product:Product;
    quantity:number; */
    $key:string;
    title:string;
    imageUrl:string;
    price:number;
    quantity:number;
    /* constructor(public product:Product,public quantity:number){        
    }  */
    constructor(init:Partial<ShoppingCartItem>){
        Object.assign(this,init);
    }
    get totalPrice(){
        //return this.product.price * this.quantity;
        return this.price * this.quantity;
    }
}