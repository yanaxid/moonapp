import { Component, inject } from '@angular/core';
import { MoonserviceService } from '../../../services/moonservice.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';





@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent {

  
   
   value: string = ''

   customer = {
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      pic: ''
   };

   selectedFile: File | null = null;
   errorMessage: string | null = null;
   imageUrl: string | null = null;

   constructor(private service: MoonserviceService, private toastr: ToastrService, private router: Router) { }

   onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];

      if (this.selectedFile) {
         // Upload gambar setelah file dipilih
         this.uploadPicture();
      }
   }

   

   uploadPicture() {
      if (this.selectedFile) {
         this.service.uploadPicture(this.selectedFile).subscribe({
            next: response => {
               console.log('Gambar berhasil diunggah', response);

               
               
               this.customer.pic = response.data.filename;
               this.errorMessage = null;
               this.imageUrl = response.data.fileUrl;
               console.log(this.imageUrl);
               console.log(this.customer);
            },
            error: error => {
               this.errorMessage = error;
            }
         });
      }
   }

   onSubmit(customerForm: NgForm) { // Tambahkan parameter customerForm
      const customerData = {
         customerName: this.customer.customerName,
         customerAddress: this.customer.customerAddress,
         customerPhone: this.customer.customerPhone,
         pic: this.customer.pic
      };

      console.log(customerData);

      this.service.addCustomer(customerData).subscribe({
         next: response => {
            console.log('Customer berhasil ditambahkan', response);
  
            
            // Reset form dan properties
            customerForm.resetForm(); // Reset form
            this.customer = { // Reset customer object
               customerName: '',
               customerAddress: '',
               customerPhone: '',
               pic: ''
            };
            this.imageUrl = null; // Reset image URL
            
            this.toastr.success('Berhasil menambah customer', '');

            this.router.navigate(['/customer-list']); 
            
         },
         error: error => {
            console.error('Terjadi kesalahan', error);
            this.toastr.error('Gagal menambah customer', '');
 
         },
         complete: () => {
            console.log('Request selesai');
         }
      });


   }
}
