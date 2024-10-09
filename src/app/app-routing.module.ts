import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './pages/customer/customers/customers.component';
import { CustomerDetailsComponent } from './pages/customer/customer-details/customer-details.component';
import { CustomerAddComponent } from './pages/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './pages/customer/customer-edit/customer-edit.component';
import { ItemsComponent } from './pages/item/items/items.component';
import { OrdersComponent } from './pages/order/orders/orders.component';
import { OrderAddComponent } from './pages/order/order-add/order-add.component';
import { ItemAddComponent } from './pages/item/item-add/item-add.component';
import { ItemDetailsComponent } from './pages/item/item-details/item-details.component';
import { ItemEditComponent } from './pages/item/item-edit/item-edit.component';
import { OrderEditComponent } from './pages/order/order-edit/order-edit.component';


const routes: Routes = [
   { path: 'customer-list', component: CustomersComponent },
   { path: 'customer-detail/:customerCode', component: CustomerDetailsComponent },
   { path: 'add-customer', component: CustomerAddComponent },
   { path: 'edit-customer/:customerCode', component: CustomerEditComponent },
   { path: 'edit-item/:itemCode', component: ItemEditComponent },
   { path: 'edit-order/:orderCode', component: OrderEditComponent },
   { path: 'items', component: ItemsComponent },
   { path: 'add-item', component: ItemAddComponent },
   { path: 'item-details/:itemCode', component: ItemDetailsComponent },
   { path: 'orders', component: OrdersComponent },
   { path: 'add-orders', component: OrderAddComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
