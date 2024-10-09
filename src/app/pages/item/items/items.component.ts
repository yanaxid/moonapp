import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoonserviceService } from '../../../services/moonservice.service';

@Component({
   selector: 'app-items',
   templateUrl: './items.component.html',
   styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {


   items: any = [];


   meta: any = {};
   totalPages: number = 0
   searchQuery: string = ''
   sort: string = ''
   page: number = 1
   size: number = 10
   status: string = ''


   sortList = [
      { value: 'item_name.keyword,asc', name: 'nama ASC' },
      { value: 'item_name.keyword,desc', name: 'nama DESC' },
      { value: 'item_code.keyword,asc', name: 'code ASC' },
      { value: 'item_code.keyword,desc', name: 'code DESC' },
      { value: 'stock,asc', name: 'stock ASC' },
      { value: 'stock,desc', name: 'stock DESC' },
      { value: 'price,asc', name: 'price ASC' },
      { value: 'price,desc', name: 'price DESC' }
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
      this.loadItems();
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

   loadItems() {
      this.service.searchItem(this.searchQuery, this.sort, this.status, 1, this.size).subscribe(res => {
         this.items = res.data
         this.meta = res.meta
         console.log(this.meta)
         this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
      });
   }

   onSearchChange() {
      if (this.searchQuery || this.sort || this.status || this.page || this.size) {
         this.service.searchItem(this.searchQuery, this.sort, this.status, this.page, this.size).subscribe(res => {
            this.items = res.data
            this.meta = res.meta
            this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);

         });
      } else {
         this.loadItems();
      }
   }

   onSearchChange2() {
      this.page = 1
      this.onSearchChange()
   }




   deleteCustomer(customerCode: string) {

      // Jika pengguna mengkonfirmasi, lakukan penghapusan
      this.service.delCustomer(customerCode).subscribe({
         next: (res) => {
            console.log('Customer deleted:', res);
            // Berhasil menghapus customer, tampilkan pesan
            this.toastr.success('Berhasil menghapus item', '');

            // Ubah isActive menjadi false pada customer yang sesuai
            const customer = this.items.find((cust: any) => cust.customerCode === customerCode);
            if (customer) {
               customer.isActive = false;
            }
         },
         error: (err) => {
            console.error('Error deleting item:', err);
            this.toastr.error('Gagal menghapus item', '');
         }
      });

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


   confirmDelete(itemCode: string) {
      this.service.delItem(itemCode).subscribe({

         next: (res) => {
            // console.log('Customer deleted:', res);
            this.toastr.success('Berhasil menghapus customer', '');

            const customer = this.items.find((cust: any) => cust.itemCode === itemCode);
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








}
