import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoonserviceService } from '../../../services/moonservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

   orders: any = [];




   
   meta: any = {};
   totalPages: number = 0
   searchQuery: string = ''
   sort: string = ''
   page: number = 1
   size: number = 10
   status: string = ''


   sortList = [
      { value: 'customer.customer_name.keyword,asc', name: 'Customer Nama ASC' },
      { value: 'customer.customer_name.keyword,desc', name: 'Customer Nama DESC' },
      { value: 'order_date,asc', name: 'Orderdate ASC' },
      { value: 'order_date,desc', name: 'Orderdate DESC' },
      { value: 'order_code.keyword,asc', name: 'Ordercode ASC' },
      { value: 'order_code.keyword,desc', name: 'Ordercode DESC' }
   ]

   filterIsActiveList = [
      { value: 'true', name: 'active' },
      { value: 'false', name: 'non active' },
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
      this.service.searchOrder(this.searchQuery, this.sort, this.status, 1, this.size).subscribe(res => {
         this.orders = res.data

         console.log(this.orders)
         this.meta = res.meta
         console.log(this.meta)
         this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
      });
   }

   onSearchChange() {
      if (this.searchQuery || this.sort || this.status || this.page || this.size) {
         this.service.searchOrder(this.searchQuery, this.sort, this.status, this.page, this.size).subscribe(res => {
            this.orders = res.data
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




   // deleteCustomer(customerCode: string) {
   //    // Menampilkan dialog konfirmasi
   //    const confirmed = window.confirm('Are you sure you want to delete this customer?');
   
   //    if (confirmed) {
   //       // Jika pengguna mengkonfirmasi, lakukan penghapusan
   //       this.service.delCustomer(customerCode).subscribe({
   //          next: (res) => {
   //             console.log('Customer deleted:', res);
   //             // Berhasil menghapus customer, tampilkan pesan
   //             this.toastr.success('Berhasil menghapus customer', '');
   
   //             // Ubah isActive menjadi false pada customer yang sesuai
   //             const customer = this.orders.find((cust: any) => cust.customerCode === customerCode);
   //             if (customer) {
   //                customer.isActive = false;
   //             }
   //          },
   //          error: (err) => {
   //             console.error('Error deleting customer:', err);
   //             this.toastr.error('Gagal menghapus customer', '');
   //          }
   //       });
   //    } else {
   //       console.log('Customer deletion canceled');
   //    }
   // }



   
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




   confirmDelete(orderCode: string) {
      this.service.delOrder(orderCode).subscribe({

         next: (res) => {

            console.log('yanaaaa')
            // console.log('Customer deleted:', res);
            this.toastr.success('Berhasil menghapus customer', '');

            // const customer = this.orders.find((cust: any) => cust.orderCode === orderCode);
            // if (customer) {
            //    customer.isOrderActive = false;
            // }
         },
         error: (err) => {
            // console.error('Error deleting customer:', err);
            this.toastr.error('Gagal menghapus customer', '');
         }
      });

   }


   getReport() {

      window.location.href = 'http://localhost:8080/report/generate';
   }
      





   
   

}

