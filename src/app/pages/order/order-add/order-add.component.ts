import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoonserviceService } from '../../../services/moonservice.service';


const customerCode = null;

const items: any[] = [];


@Component({
   selector: 'app-order-add',
   templateUrl: './order-add.component.html',
   styleUrl: './order-add.component.css'
})
export class OrderAddComponent {

   //untuk menyimpan data list dari elastic
   items: any = [];
   customers: any = [];

   // menyimpan data dari list yg dipilih
   selectedCustomer: any;

   selectedItems: any[] = [];

   //data yg akan di simpan ke database
   uploadData = {
      customerCode: customerCode,
      items: items
   };

   //keyword
   searchQuery: string = '';
   searchItemQuery: string = '';



   meta: any = {};
   totalPages: number = 0;
   sort: string = '';
   page: number = 1;
   size: number = 10;
   status: string = 'true';

   selectedFile: File | null = null;
   errorMessage: string | null = null;
   imageUrl: string | null = null;

   constructor(
      private service: MoonserviceService,
      private toastr: ToastrService
   ) { }

   ngOnInit() {
      this.loadCustomers();
      this.loadItems();
   }

   onCustomerClick(customer: any) {
      this.selectedCustomer = customer;
      this.showModal = false;
      this.customers = [];



      this.uploadData.customerCode = this.selectedCustomer.customerCode;
      // console.log(this.uploadData);
   }

   onItemClick(item: any) {


      this.calculateTotal(item)

      console.log("selectedItems ", this.selectedItems)
      console.log("uploadData ", this.uploadData)

      const exists = this.selectedItems.some(
         selectedItem => selectedItem.itemId === item.itemId
      );

      if (!exists) {

         this.selectedItems.push(item);

         const items = this.selectedItems.map(item => ({
            itemCode: item.itemCode,
            quantity: item.quantity
         }));


         this.uploadData.items = items;

         this.showModal2 = false

      } else {
         // console.log('Item sudah dipilih.');
         this.toastr.warning('Item sudah dipilih', '');
         this.loadItems()
      }

      this.items = [];
   }

   loadCustomers() {
      this.service.searchCustomer(
         this.searchQuery,
         this.sort,
         this.status,
         1,
         this.size
      ).subscribe(res => {
         this.customers = res.data;
         this.meta = res.meta;
         this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
      });
   }

   onSearchChange() {
      if (this.searchQuery || this.sort || this.status || this.page || this.size) {
         this.service.searchCustomer(
            this.searchQuery,
            this.sort,
            this.status,
            this.page,
            this.size
         ).subscribe(res => {
            this.customers = res.data;
            this.meta = res.meta;
            this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
         });
      } else {
         this.loadCustomers();
      }



   }


   updateItemSelectionStatus() {
      this.items = this.items.map((item: any) => {
         const isSelected = this.selectedItems.some((selectedItem: any) => selectedItem.itemCode === item.itemCode);
         return {
            ...item,
            terpilih: isSelected // jika ada di selectedItems, set terpilih ke true, jika tidak false
         };
      });
   }

   


   loadItems() {

      this.service.searchItem(
         this.searchItemQuery,
         this.sort,
         this.status,
         1,
         this.size
      ).subscribe(res => {

         // Tambahkan quantity: 1 ke setiap item sebagai nilai default
         this.items = res.data.map((item: any) => ({
            ...item,
            quantity: 1
         }));

         this.updateItemSelectionStatus()
         // console.log("---> ", this.items)

         this.meta = res.meta;
         this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
      });
   }

   onSearchChangeItem() {
      if (this.searchItemQuery || this.sort || this.status || this.page || this.size) {
         this.service.searchItem(
            this.searchItemQuery,
            this.sort,
            this.status,
            this.page,
            this.size
         ).subscribe(res => {
            this.items = res.data;
            this.meta = res.meta;
            this.totalPages = Math.ceil(this.meta.total / this.meta.perPage);
         });
      } else {
         this.loadItems();
      }
   }

   onSearchChangeItem2() {
      this.page = 1;
      this.onSearchChangeItem();
   }

   onSearchChange2() {
      this.page = 1;
      this.onSearchChange();
   }




   removeItemFromSelectedItems(item: any) {
      console.log("uploadData.items", this.uploadData.items);
      
      const index = this.selectedItems.indexOf(item); 
      if (index > -1) {
         this.selectedItems.splice(index, 1); // Hapus item dari selectedItems
      }
   
      // Ambil hanya properti itemCode dan Quantity dari selectedItems
      this.uploadData.items = this.selectedItems.map(selectedItem => {
         return {
            itemCode: selectedItem.itemCode,
            quantity: selectedItem.quantity
         };
      });
   
      console.log("uploadData.items", this.uploadData.items);
   }
   
   


   calculateTotal(item: any) {
      const items = this.selectedItems.map(item => ({
         itemCode: item.itemCode,
         quantity: item.quantity
      }));
      this.uploadData.items = items;
      // console.log(this.uploadData);

      item.totalPrice = item.quantity * item.price;

      // console.log(this.uploadData);
   }

   calculateTotalPrice(): number {
      return this.selectedItems.reduce((total, item) => {
         const itemTotalPrice = item.totalPrice || 0;
         return total + itemTotalPrice;
      }, 0);
   }

   onSubmit() {


      // console.log(this.uploadData);

      this.service.addOrder(this.uploadData).subscribe({
         next: response => {
            // console.log('Customer berhasil ditambahkan', response);
            this.toastr.success('Berhasil menambah orders', '');
         },
         error: error => {
            // console.error('Terjadi kesalahan', error);
            this.toastr.error('Gagal menambah orders', '');
         },
         complete: () => {
            console.log('Request selesai');
         }
      });
   }


   //   FOR CUSTOMER
   showModal: boolean = false;
   customerToDelete: string | null = null;

   openModal() {
      this.showModal = true;
      this.loadCustomers()

   }

   closeModal() {
      this.showModal = false;
   }


   //   FOR CUSTOMER
   showModal2: boolean = false;
   customerToDelete2: string | null = null;

   openModal2() {
      this.showModal2 = true;
      this.loadItems()
   }

   closeModal2() {
      this.showModal2 = false;
   }

}

