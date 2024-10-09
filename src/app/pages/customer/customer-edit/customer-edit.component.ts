
import { Component } from '@angular/core';
import { MoonserviceService } from '../../../services/moonservice.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {

  value: string = '';
  customerCode: string = '';
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  imageUrl: string | null = null;

  customer = {
    customerId: '',
    customerCode: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    pic: {
      pic: '',
      picUrl: ''
    }
  };

  constructor(
    private service: MoonserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerCode = this.route.snapshot.paramMap.get('customerCode') || '';


    console.log('Customer Code:', this.customerCode);

    this.service.searchCustomerDetail(this.customerCode).subscribe(res => {
      
      
      this.customer = res.data;

      if (res.data.pic == null) {
        // Jika pic null, set pic.pic dan pic.picUrl ke string kosong
        this.customer.pic = {
          pic: 'detault.jpg',
          picUrl: 'detault.jpg'
        };
      }

      console.log(this.customer);
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
          this.customer.pic = {
            pic: response.data.filename,
            picUrl: response.data.fileUrl
          };
          this.errorMessage = null;
          this.imageUrl = this.customer.pic.picUrl;
          console.log(this.imageUrl);
          console.log(this.customer);
        },
        error: error => {
          this.errorMessage = error;
        }
      });
    }
  }

  onSubmit(customerForm: NgForm): void {
    const customerData = {
      customerCode: this.customer.customerCode,
      customerName: this.customer.customerName,
      customerAddress: this.customer.customerAddress,
      customerPhone: this.customer.customerPhone,
      pic: this.customer.pic.pic === 'detault.jpg' ? '' : this.customer.pic.pic
    };

    console.log("data", customerData);

    this.service.editCustomer(customerData, this.customer.customerCode).subscribe({
      next: response => {
        console.log('Customer berhasil diubah', response);
        this.toastr.success('Berhasil mengedit customer', '');
      },
      error: error => {
        this.toastr.error('Gagal mengedit customer', '');
      },
      complete: () => {
        console.log('Request selesai');
      }
    });
  }

}
