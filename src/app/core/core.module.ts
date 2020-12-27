import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
  /*   CommonModule, */
    SharedModule,
    RouterModule.forChild([
     /*  {path:'',component:ProductsComponent},
      {path:'login',component:LoginComponent} */
      //shopping cart nav not working so we have moved the routes here
      //for the above code to work we need to import the SharedModule which cause circular dependency
      // so here we are going to pass empty array
      //later we need to import sharedmodule coz we need common module and it is declared in shared
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent 
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
