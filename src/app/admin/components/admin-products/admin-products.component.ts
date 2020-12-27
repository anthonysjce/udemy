import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  //products$;commmented while implementing search,since we need deal with products directly
  products:Product[];
  //filterProducts:Product[]
  subscription:Subscription;
  tableResource:DataTableResource<Product>;
  items:Product[] = [];
  itemCount:number;
  limit:number = 10;
  constructor(private productService:ProductService) { 
    //commmented while implementing search,since we need deal with products directly
    //this.products$ = productService.getAll();
    this.subscription = productService.getAll().subscribe(products=>{
     /*  this.filterProducts =  */this.products = products;
      this.intializeTable(products);
      
    })

  }
  intializeTable(products:Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0}).then(items=>this.items = items);
      this.tableResource.count().then(count => this.itemCount = count)
  }
  reloadItems(params) {
    console.log(params);
   if(!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }
  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  filter(searchText:string){
    //console.log(searchText);
   let filterProducts = (searchText) ? 
      this.products.filter(p =>
        p.title.toLowerCase().includes(searchText.toLowerCase())) : 
        this.products;
      this.intializeTable(filterProducts);
  }

}
