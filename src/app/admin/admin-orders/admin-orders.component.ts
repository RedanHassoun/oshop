import { UserService } from 'shared/services/user.service';
import { OrderService } from 'shared/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/model/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
  orders:Order[]
  ordersSubscription:Subscription
  
  constructor(private orderService:OrderService,
             private userService:UserService) {
   }

  ngOnInit() {
    this.initOrdersList();
  }

  ngOnDestroy() {
    if(this.ordersSubscription)
      this.ordersSubscription.unsubscribe()
  }

  async getUserName(uid:string){
    let user = await this.userService.get(uid).toPromise()
    return user.name
  }

  private initOrdersList(){
    let ordersList:Order[] = []
    this.ordersSubscription = this.orderService.getAll()
      .subscribe(res=>{
        ordersList.push(res);
    })
    this.orders = ordersList;
  }
}
