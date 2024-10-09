import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
   @Input()
   icon: string = ''

   @Input()
   bg: string = ''

   @Input()
   color: string = ''

   
}
