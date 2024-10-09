import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-pagination',
   templateUrl: './pagination.component.html',
   styleUrl: './pagination.component.css'
})
export class PaginationComponent {

   @Input()
   totalPages: number = 0
   
   @Input()
   currentPage: number = 1
   

   @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // @Output untuk memancarkan halaman aktif

   
   get pages(): number[] {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
   }

   

   // Fungsi untuk mengatur halaman aktif saat ini
   setPage(page: number): void {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage); // Emit nilai halaman baru
   }

   // Fungsi untuk tombol prev
   prevPage(): void {
      if (this.currentPage > 1) {
         this.currentPage--;
         this.pageChange.emit(this.currentPage); // Emit nilai halaman baru
      }
   }

   // Fungsi untuk tombol next
   nextPage(): void {
      if (this.currentPage < this.totalPages) {
         this.currentPage++;
         this.pageChange.emit(this.currentPage); // Emit nilai halaman baru
      }
   }

}
