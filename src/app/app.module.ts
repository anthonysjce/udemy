import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
   /*  BsNavbarComponent,
    HomeComponent,
    LoginComponent  */

    /* ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,     */
     
    /* ProductFilterComponent,   
    ShoppingCartSummaryComponent,
    ShippingFormComponent */
  ],
  imports: [
    BrowserModule,    
    AngularFireModule.initializeApp(environment.firebase),
    /* AngularFireDatabaseModule,
    AngularFireAuthModule,
     NgbModule.forRoot(), */
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
   
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'login',component:LoginComponent}
      
     /*  {
        path:'admin/products/new',
        component:ProductFormComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products/:id',
        component:ProductFormComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products',
        component:AdminProductsComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },      
      {
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      }, */

    ])
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
