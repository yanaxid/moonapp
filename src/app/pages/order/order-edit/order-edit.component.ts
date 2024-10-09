

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoonserviceService } from '../../../services/moonservice.service';
import { ActivatedRoute } from '@angular/router';


const customerCode = null;

const items: any[] = [];


@Component({
   selector: 'app-order-edit',
   templateUrl: './order-edit.component.html',
   styleUrl: './order-edit.component.css'
})
export class OrderEditComponent {

   //untuk menyimpan data list dari elastic
   items: any = [];
   customers: any = [];

   orderCode: string = ''

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
      private toastr: ToastrService,
      private route: ActivatedRoute,
   ) { }

   ngOnInit() {
      this.loadCustomers();
      this.loadItems();

      this.orderCode = this.route.snapshot.paramMap.get('orderCode') || '';
      this.loadOrder(this.orderCode)

   }

   loadOrder(orderCode: string) {

      this.service.searchOrderDetail(orderCode).subscribe(res => {



         //init item
         this.selectedItems = res.data.items.map((item: any) => {

            console.log("item", item)


            return {
               orderId: item.orderId,
               itemId: item.itemId,
               itemCode: item.itemCode,
               itemName: item.itemName,
               price: item.price,
               quantity: item.quantity,
               totalPrice: item.totalItemPrice,
               isActive: item.isActive,
               terpilih: false,
               pic: item.pic,
               picUrl: item.picUrl,
            };
         });

         //init customer
         this.selectedCustomer = res.data.customer


         console.log("selectedCustomer:", this.selectedCustomer);


         console.log("selectedItems:", this.selectedItems);

         this.uploadData.items = this.selectedItems.map((item: any) => {
            return {
               orderId: item.orderId,
               itemCode: item.itemCode,
               quantity: item.quantity,
               isActive: item.isActive

            };
         });

         this.uploadData.customerCode = res.data.customer.customerCode;

         console.log("uploadData:", this.uploadData);


      });

   }

   onCustomerClick(customer: any) {
      this.selectedCustomer = customer;
      this.showModal = false;
      this.customers = [];

      this.uploadData.customerCode = this.selectedCustomer.customerCode;
      console.log("from user uploadData", this.uploadData);
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
            orderId: item.orderId,
            itemCode: item.itemCode,
            quantity: item.quantity,
            isActive: item.isActive
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


   // updateItemSelectionStatus() {
   //    this.items = this.items.map((item: any) => {
   //       const isSelected = this.selectedItems.some((selectedItem: any) => selectedItem.itemCode === item.itemCode);
   //       return {
   //          ...item,
   //          terpilih: isSelected // jika ada di selectedItems dan isActive == true, set terpilih. 
   //       };
   //    });
   // }

   updateItemSelectionStatus() {
      this.items = this.items.map((item: any) => {
         // Cek apakah item ada di selectedItems dan isActive == true
         const isSelected = this.selectedItems.some((selectedItem: any) =>
            selectedItem.itemCode === item.itemCode && selectedItem.isActive === true
         );
         return {
            ...item,
            terpilih: isSelected // set 'terpilih' hanya jika item ada di selectedItems dan isActive == true
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


      this.calculateTotalPrice()



      console.log("uploadData.items : before", this.uploadData.items);

      // Ubah `isActive` dari item menjadi `false`
      item.isActive = false;

      // Perbarui `uploadData.items` dengan kondisi terbaru dari `selectedItems`
      this.uploadData.items = this.selectedItems.map(selectedItem => {
         return {
            orderId: selectedItem.orderId, // harus menggunakan `selectedItem` di sini
            itemCode: selectedItem.itemCode,
            quantity: selectedItem.quantity,
            isActive: selectedItem === item ? false : selectedItem.isActive // set `isActive = false` jika item cocok
         };
      });

      this.updateItemSelectionStatus()

      

      console.log("uploadData.items - after", this.uploadData.items);
   }





   calculateTotal(item: any) {
      const items = this.selectedItems.map(item => ({
         orderId: item.orderId,
         itemCode: item.itemCode,
         quantity: item.quantity,
         isActive: item.isActive
      }));
      this.uploadData.items = items;
      console.log("from calculateTotal ", this.uploadData);

      item.totalPrice = item.quantity * item.price;



      console.log(this.selectedItems)

      // console.log(this.uploadData);
   }

   // calculateTotalPrice(): number {
   //    return this.selectedItems.reduce((total, item) => {
   //       const itemTotalPrice = item.totalPrice || 0;
   //       return total + itemTotalPrice;
   //    }, 0);
   // }

   calculateTotalPrice(): number {
      return this.selectedItems
         .filter(item => item.isActive) // Filter hanya item yang isActive == true
         .reduce((total, item) => {
            const itemTotalPrice = item.totalPrice || 0;
            return total + itemTotalPrice;
         }, 0);
   }
   

   onSubmit() {


      // console.log(this.uploadData);

      this.service.editOrder(this.uploadData, this.orderCode).subscribe({
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


