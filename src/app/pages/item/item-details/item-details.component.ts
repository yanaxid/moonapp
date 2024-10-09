import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoonserviceService } from '../../../services/moonservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  

   itemCode: string = '';
   item: any = {};

   constructor(
      private route: ActivatedRoute,
      private service: MoonserviceService,
      private toastr: ToastrService,
      private router: Router // Inject Router untuk navigasi
   ) { }

   ngOnInit(): void {

      this.itemCode = this.route.snapshot.paramMap.get('itemCode') || '';
      console.log('Item Code:', this.itemCode);

      this.service.searchItemDetail(this.itemCode).subscribe(res => {
         this.item = res.data;
         console.log(this.item);
      });
   }



   // DELETE

   showModal: boolean = false;
   customerToDelete: string | null = null;

   openModal(itemCode: string) {
      this.customerToDelete = itemCode;
      this.showModal = true;
   }

   closeModal() {
      this.showModal = false;
      this.customerToDelete = null;
   }


   confirmDelete(itemCode: string) {
      this.service.delItem(itemCode).subscribe({
         next: (res) => {

            this.toastr.success('Berhasil menghapus item', '');
            this.router.navigate(['/items']); 
         },
         error: (err) => {
            // console.error('Error deleting customer:', err);
            this.toastr.error('Gagal menghapus item', '');
         }
      });

   }


}
