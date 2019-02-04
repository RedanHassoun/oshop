import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'shared/model/order';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders:Order[] = []
  ordersSubscription:Subscription

  constructor(
    private authService:AuthService,
    private orderService:OrderService) { }

  ngOnInit() {
    this.initMyOrdersList()
  }

  private initMyOrdersList(){
    // TODO: implement with query
    this.authService.user$.subscribe(u=>{
      let ordersList:Order[] = []
      this.ordersSubscription = this.orderService.getAll()
        .subscribe(res=>{
          if(res.userId === u.uid)
            ordersList.push(res);
      })
      this.orders = ordersList;
    })
  }
}
