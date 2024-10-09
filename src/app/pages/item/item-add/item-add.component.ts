



import { Component, inject, OnInit } from '@angular/core';
import { MoonserviceService } from '../../../services/moonservice.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
   selector: 'app-item-add',
   templateUrl: './item-add.component.html',
   styleUrl: './item-add.component.css'
})
export class ItemAddComponent {






   value: string = ''

   item = {
      itemName: '',
      price: 1,
      stock: 1,
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

               this.item.pic = response.data.filename;
               this.errorMessage = null;
               this.imageUrl = response.data.fileUrl;
               console.log(this.imageUrl);
               console.log(this.item);
            },
            error: error => {
               this.errorMessage = error;
            }
         });
      }
   }

   onSubmit(itemForm: NgForm) { // Tambahkan parameter customerForm
      const itemData = {
         itemName: this.item.itemName,
         price: this.item.price,
         stock: this.item.stock,
         pic: this.item.pic
      };

      console.log(itemData);

      console.log("-----> "+ itemData.pic)

      this.service.addItem(itemData).subscribe({
         next: response => {
            console.log('Customer berhasil ditambahkan', response);


            // Reset form dan properties
            itemForm.resetForm(); // Reset form
            this.item = { // Reset customer object
               itemName: '',
               price: 1,
               stock: 1,
               pic: ''
            };
            this.imageUrl = null; // Reset image URL

            this.toastr.success('Berhasil menambah item', '');

            this.router.navigate(['/items']);

         },
         error: error => {
            console.error('Terjadi kesalahan', error);
            this.toastr.error('Gagal menambah item', '');

         },
         complete: () => {
            console.log('Request selesai');
         }
      });


   }
}
