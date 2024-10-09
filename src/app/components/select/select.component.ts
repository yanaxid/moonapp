import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-select',
   templateUrl: './select.component.html',
   styleUrl: './select.component.css'
})
export class SelectComponent {

   @Input()
   options: { value: string; name: string }[] = []

   @Input()
   label: string = ''

   @Output()
   selectedOption = new EventEmitter<string>();

   // Fungsi untuk mengirim id yang dipilih
   onOptionSelected(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const selectedValue = selectElement.value;
      this.selectedOption.emit(selectedValue);  // Emit id yang dipilih
   }

}

