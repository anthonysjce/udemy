import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  order$;
  constructor(private authService:AuthService,private orderservice:OrderService) { 

  }

  ngOnInit() {
    this.order$ = this.authService.user$.switchMap(u =>this.orderservice.getOrdersByUser(u.uid));
  }

}
