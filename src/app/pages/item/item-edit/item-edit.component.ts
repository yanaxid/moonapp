import { Component } from '@angular/core';
import { MoonserviceService } from '../../../services/moonservice.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-item-edit',
   templateUrl: './item-edit.component.html',
   styleUrl: './item-edit.component.css'
})
export class ItemEditComponent {

   value: string = '';
   itemCode: string = '';

   selectedFile: File | null = null;
   errorMessage: string | null = null;
   imageUrl: string | null = null;

   item = {
      itemId: '',
      itemCode: '',
      itemName: '',
      price: 0,
      stock: 0,
      pic: '',
      picUrl: ''
   };

   constructor(
      private service: MoonserviceService,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router
   ) { }

   ngOnInit(): void {
      this.itemCode = this.route.snapshot.paramMap.get('itemCode') || '';
      console.log('Item Code:', this.itemCode);

      this.service.searchItemDetail(this.itemCode).subscribe(res => {
         this.item = res.data;

         if (res.data.pic == null || res.data.pic == '') {
            // Jika pic null, set pic.pic dan pic.picUrl ke string kosong

            this.item.pic = 'detault.jpg'
            this.item.picUrl = 'detault.jpg'
         }

         console.log(this.item);
      });
   }

   onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
         this.uploadPicture();
      }
   }

   uploadPicture(): void {
      if (this.selectedFile) {
         this.service.uploadPicture(this.selectedFile).subscribe({
            next: response => {
               console.log('Gambar berhasil diunggah', response);
               this.item.pic = response.data.filename

               this.item.picUrl = response.data.fileUrl

               this.errorMessage = null;
               this.imageUrl = this.item.picUrl;
               console.log(this.imageUrl);
               console.log(this.item);
            },
            error: error => {
               this.errorMessage = error;
            }
         });
      }
   }

   onSubmit(itemForm: NgForm): void {

      const customerData = {
         itemCode: this.item.itemCode,
         itemName: this.item.itemName,
         price: this.item.price,
         stock: this.item.stock,
         pic: this.item.pic === 'detault.jpg' ? '' : this.item.pic
      };

      console.log("data", customerData);

      this.service.editItem(customerData, this.item.itemCode).subscribe({
         next: response => {
            console.log('Item berhasil diubah', response);
            this.toastr.success('Berhasil mengedit item', '');
         },
         error: error => {
            this.toastr.error('Gagal mengedit item', '');
         },
         complete: () => {
            console.log('Request selesai');
         }
      });
   }

}
