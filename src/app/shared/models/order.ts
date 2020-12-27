import { Shoppingcart } from "./shopping-cart";

export class Order {
    datePlaced: number;
   /*  userId: string;
    shipping: any; *///make public in constructor
    items: any[];
    constructor(public userId: string, public shipping: any,cart: Shoppingcart) {

        this.datePlaced = new Date().getTime(),
       /*  userId = userId,
        this.shipping = shipping; */
        this.items = cart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}
