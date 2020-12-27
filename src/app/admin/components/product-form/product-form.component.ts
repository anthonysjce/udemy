import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router ,ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product  ;/* since we are using it in binding . when this loaded p will be null and throw
  null execption. so intiallize to some object */
  id;
  constructor(private router:Router,
  private categorySerice:CategoryService,
  private productService:ProductService,
  private route:ActivatedRoute) {
    this.product = {}
    this.categories$ = categorySerice.getCategories();
    
    this.id = route.snapshot.paramMap.get('id');
    if(this.id)
      productService.getProduct(this.id).take(1).subscribe(p=>this.product = p)

   }

  ngOnInit() {
  }
  save(product){
    if(this.id){
      this.productService.update(this.id,product);
    }else
      this.productService.create(product);

      // here we need not have wait in case of  firebase
      //if there is delay in updating the producct and we moved to navigation page 
      //then page will get refreshed in case of firebase
      this.router.navigate(['/admin/products'])
  }
  delete(){
    if(!confirm('do you want to delete this product'))
      return;

    if(this.id)
     this.productService.delete(this.id);
    
    this.router.navigate(['/admin/products']);
  }
}
