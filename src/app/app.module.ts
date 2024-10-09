import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './pages/item/items/items.component';
import { ItemDetailsComponent } from './pages/item/item-details/item-details.component';
import { ItemAddComponent } from './pages/item/item-add/item-add.component';
import { ItemEditComponent } from './pages/item/item-edit/item-edit.component';
import { OrdersComponent } from './pages/order/orders/orders.component';
import { OrderDetailComponent } from './pages/order/order-detail/order-detail.component';
import { OrderAddComponent } from './pages/order/order-add/order-add.component';
import { OrderEditComponent } from './pages/order/order-edit/order-edit.component';
import { CustomersComponent } from './pages/customer/customers/customers.component';
import { CustomerDetailsComponent } from './pages/customer/customer-details/customer-details.component';
import { CustomerAddComponent } from './pages/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './pages/customer/customer-edit/customer-edit.component';
import { SearchComponent } from './components/search/search.component';
import { ButtonComponent } from './components/button/button.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ConfirmComponent } from './components/confirm/confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailsComponent,
    ItemAddComponent,
    ItemEditComponent,
    OrdersComponent,
    OrderDetailComponent,
    OrderAddComponent,
    OrderEditComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    SearchComponent,
    ButtonComponent,
    PaginationComponent,
    SelectComponent,
    IconButtonComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    

  ],
  providers: [
   provideHttpClient(),
   provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
