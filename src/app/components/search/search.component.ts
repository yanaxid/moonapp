import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';



@Component({
   selector: 'app-search',
   templateUrl: './search.component.html',
   styleUrl: './search.component.css'
})
export class SearchComponent {

   @Input() searchQuery: string = '';
   @Output() searchQueryChange = new EventEmitter<string>(); // Output untuk binding dua arah


   private searchSubject = new Subject<string>();

   constructor() {
      // Menerapkan debounceTime untuk emit perubahan setelah 300ms
      this.searchSubject
         .pipe(debounceTime(300))
         .subscribe(query => {
            this.searchQueryChange.emit(query);
         });
   }

   onSearchChange() {
      this.searchSubject.next(this.searchQuery); // Emit nilai baru ke Subject
   }

}
