


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoonserviceService } from '../../../services/moonservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-customer-details',
   templateUrl: './customer-details.component.html',
   styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

   customerCode: string = '';
   customer: any = {};

   constructor(
      private route: ActivatedRoute,
      private service: MoonserviceService,
      private toastr: ToastrService,
      private router: Router // Inject Router untuk navigasi
   ) { }

   ngOnInit(): void {

      this.customerCode = this.route.snapshot.paramMap.get('customerCode') || '';
      console.log('Customer Code:', this.customerCode);

      this.service.searchCustomerDetail(this.customerCode).subscribe(res => {
         this.customer = res.data;
         console.log(this.customer);
      });
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

   //             // Ubah isActive menjadi false pada customer
   //             this.customer.isActive = false; // Ubah status langsung di sini

   //             // Arahkan kembali ke halaman daftar customer
   //             this.router.navigate(['/customer-list']); 
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


   confirmDelete(customerCode: string) {
      this.service.delCustomer(customerCode).subscribe({
         next: (res) => {

            this.toastr.success('Berhasil menghapus customer', '');
            this.router.navigate(['/customer-list']); 
         },
         error: (err) => {
            // console.error('Error deleting customer:', err);
            this.toastr.error('Gagal menghapus customer', '');
         }
      });

   }


}
