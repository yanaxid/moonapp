import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {



   @Input() text: string = '';  // Input untuk teks pada tombol
   @Input() icon?: string;      // Input untuk ikon (opsional)
   @Input() buttonType: 'blue' | 'red' | 'gray' = 'blue';  // Input untuk tipe tombol
}
