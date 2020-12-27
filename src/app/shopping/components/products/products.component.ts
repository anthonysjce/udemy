import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { Shoppingcart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  //product$ 
  products:Product[] = [];
  filterProducts:Product[] = [];
  //categories$
  category;
  //cart;
  cart$:  Observable<Shoppingcart>;
  subscription:Subscription;
  constructor(private productService:ProductService,
    private shoppingCartService:ShoppingCartService,
    /* private categoryService:CategoryService, */private route:ActivatedRoute) { 
      //this.product$ = productService.getAll(); 
     // this.categories$ = categoryService.getCategories();//moved to filter comp
     
     //moved to ngInit
     /*  this.subscription = productService.getAll().subscribe(products=>{
       this.filterProducts = this.products = products;       
       route.queryParamMap.subscribe(params =>{
         this.category = params.get('category');
         this.applyFilter();
       })
      });  */

      //or use below switch map. but dont know how to unsubcribe
     /*  productService.getAll().switchMap(products=>{
        this.filterProducts = this.products = products;
        return  route.queryParamMap;
      }).subscribe(params =>{
        this.category = params.get('category');
        this.filter(this.category);
      }) */
  }
  populateProducts(){
    this.subscription = this.productService.getAll().subscribe(products=>{
      this.filterProducts = this.products = products;       
      this.route.queryParamMap.subscribe(params =>{
        this.category = params.get('category');
        this.applyFilter();
      })
     }); 
  }
  applyFilter(){
    //console.log(searchText);
    this.filterProducts= (this.category) ? 
      this.products.filter(p =>
        p.category === this.category) : 
        this.products;
      
  }
  async ngOnInit() {
    /* this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart=>{
      this.cart = cart
    }) */
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe(); we are going to use async. will get destroyed by itself
  }
}
