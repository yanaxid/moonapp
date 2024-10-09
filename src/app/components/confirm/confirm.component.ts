import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-confirm',
   templateUrl: './confirm.component.html',
   styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

   @Input() message?: string
   @Input() showModal: boolean = false;          // Input untuk menampilkan modal
   @Input() customerToDelete: string | null = null; // Input untuk kode customer yang akan dihapus
   @Output() close = new EventEmitter<void>();   // Output untuk menutup modal
   @Output() confirm = new EventEmitter<string>(); // Output untuk konfirmasi penghapusan

   closeModal() {
      this.close.emit();
   }

   confirmDelete() {
      if (this.customerToDelete) {
         this.confirm.emit(this.customerToDelete);
         this.closeModal();
      }
   }
}
