import { Component, OnInit } from '@angular/core';
import { MoonserviceService } from '../../../services/moonservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-customers',
   templateUrl: './customers.component.html',
   styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

   customers: any = [];


   meta: any = {};
   totalPages: number = 0
   searchQuery: string = ''
   sort: any = null
   page: number = 1
   size: number = 10
   status: string = ''


   sortList = [
      { value: 'customer_name.keyword,asc', name: 'Nama ASC' },
      { value: 'customer_name.keyword,desc', name: 'Nama DESC' },
      { value: 'customer_code.keyword,asc', name: 'Code ASC' },
      { value: 'customer_code.keyword,desc', name: 'Code DESC' },
      { value: 'last_order_date,asc', name: 'Order ASC' },
      { value: 'last_order_date,desc', name: 'Order DESC' }
   ]

   filterIsActiveList = [
      { value: 'true', name: 'Active' },
      { value: 'false', name: 'Non Active' },
   ]

   sizeList = [
      { value: '10', name: '10' },
      { value: '50', name: '50' },
      { value: '100', name: '100' }
   ]



   constructor(private service: MoonserviceService, private toastr: ToastrService) { }


   ngOnInit() {
      this.loadCustomers();
   }


   onOptionSelected(selectedValue: string) {
      this.sort = selectedValue;
      this.onSearchChange()
   }

   changeSize(size: string) {
      this.size = Number(size)
      this.page = 1
      this.onSearchChange()
   }


   onFilterIsActiveSelected(selectedValue: string) {
      this.status = selectedValue
      this.page = 1
      this.onSearchChange()
   }

   onPageChange(newPage: number): void {
      console.log('Halaman saat ini:', newPage);
      this.page = newPage
      this.onSearchChange()
   }

   loadCustomers() {
      this.service.searchCustomer(this.searchQuery, this.sort, this.status, 1, this.size).subscribe(res => {
         this.customers = res.data
         this.meta = res.meta
         console.log(this.meta)
         this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
      });
   }

   onSearchChange() {
      if (this.searchQuery || this.sort || this.status || this.page || this.size) {
         this.service.searchCustomer(this.searchQuery, this.sort, this.status, this.page, this.size).subscribe(res => {
            this.customers = res.data
            this.meta = res.meta
            this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);

         });
      } else {
         this.loadCustomers();
      }
   }

   onSearchChange2() {
      this.page = 1
      this.onSearchChange()
   }




   // DELETE

   showModal: boolean = false;
   customerToDelete: string | null = null;

   openModal(customerCode: string) {
      this.customerToDelete = customerCode;
      this.showModal = true;
   }

   closeModal() {
      this.showModal = false;
      this.customerToDelete = null;
   }


   confirmDelete(customerCode: string) {
      this.service.delCustomer(customerCode).subscribe({
         next: (res) => {
            // console.log('Customer deleted:', res);
            this.toastr.success('Berhasil menghapus customer', '');

            const customer = this.customers.find((cust: any) => cust.customerCode === customerCode);
            if (customer) {
               customer.isActive = false;
            }
         },
         error: (err) => {
            // console.error('Error deleting customer:', err);
            this.toastr.error('Gagal menghapus customer', '');
         }
      });

   }





   // REACTIVE

   showModal2: boolean = false;
   customerToDelete2: string | null = null;

   openModal2(customerCode: string) {
      this.customerToDelete2 = customerCode;
      this.showModal2 = true;
   }

   closeModal2() {
      this.showModal2 = false;
      this.customerToDelete2 = null;
   }


   confirmDelete2(customerCode: string) {
      this.service.reActive(customerCode).subscribe({
         next: (res) => {
            // console.log('Customer deleted:', res);
            this.toastr.success('Berhasil reactive customer', '');

            const customer = this.customers.find((cust: any) => cust.customerCode === customerCode);
            if (customer) {
               customer.isActive = true;
            }
         },
         error: (err) => {
            // console.error('Error deleting customer:', err);
            this.toastr.error('Gagal reactive customer', '');
         }
      });

   }


}
