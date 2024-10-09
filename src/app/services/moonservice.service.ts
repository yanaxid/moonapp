import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class MoonserviceService {


   private url: string;





   constructor(private http: HttpClient) {
      this.url = 'http://localhost:8080';
   }



   // BUILD URL
   private buildUrl = (base: string, params: Record<string, any>): string => {
      let url = base + "?";
      for (const key in params) {
         if (params[key]) {
            url += `${key}=${encodeURIComponent(params[key])}&`;
         }
      }
      // Remove the trailing '&'
      url = url.slice(0, -1);
      return url;
   };




   // UPLOAD PICTURE
   uploadPicture(file: File): Observable<any> {
      const uploadUrl = `http://localhost:8080/file/upload-pic`;
      const formData = new FormData();
      formData.append('file', file); // 'file' is the key expected by the backend

      return this.http.post(uploadUrl, formData).pipe(
         catchError(this.errorHandler)
      );
   }







   // ADD ORDER
   addOrder(order: any): Observable<any> {
      const url = `http://localhost:8080/order/add-order`;
      return this.http.post(url, order, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }





   // ADD CUSTOMER
   addCustomer(customerData: any): Observable<any> {
      const addCustomerUrl = `http://localhost:8080/customer/add-customer`;
      return this.http.post(addCustomerUrl, customerData, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }


   // ADD ITEM
   addItem(itemData: any): Observable<any> {
      const url = `http://localhost:8080/item/add-item`;
      return this.http.post(url, itemData, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }


   // UPDATE CUSTOMER
   editCustomer(customerData: any, customerCode: string): Observable<any> {
      const cusUrl = `http://localhost:8080/customer/update-customer/` + customerCode;
      return this.http.put(cusUrl, customerData, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }


   // UPDATE ITEM
   editItem(itemData: any, itemCode: string): Observable<any> {
      const url = `http://localhost:8080/item/update-item/` + itemCode;
      return this.http.put(url, itemData, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }



   // UPDATE ORDER
   editOrder(orderData: any, orderCode: string): Observable<any> {
      const url = `http://localhost:8080/order/update-order/` + orderCode;
      return this.http.put(url, orderData, {
         headers: { 'Content-Type': 'application/json' }
      }).pipe(
         catchError(this.errorHandler)
      );
   }







   // DELETE CUSTOMER
   delCustomer(customerCode: string): Observable<any> {

      const addCustomerUrl = `http://localhost:8080/customer/delete-customer/` + customerCode;
      return this.http.put(addCustomerUrl, null).pipe(
         catchError(this.errorHandler)
      );
   }

   // DELETE CUSTOMER
   delItem(itemCode: string): Observable<any> {

      const url = `http://localhost:8080/item/delete-item/` + itemCode;
      return this.http.put(url, null).pipe(
         catchError(this.errorHandler)
      );
   }


   // DELETE CUSTOMER
   delOrder(orderCode: string): Observable<any> {

      console.log(orderCode)

      const url = `http://localhost:8080/order/delete-order/` + orderCode;
      return this.http.put(url, null).pipe(
         catchError(this.errorHandler)
      );
   }





   // REACTIVE CUSTOMER
   reActive(customerCode: string): Observable<any> {

      const addCustomerUrl = `http://localhost:8080/customer/reactive-customer/` + customerCode;
      return this.http.put(addCustomerUrl, null).pipe(
         catchError(this.errorHandler)
      );

   }



   //SEARCH CUSTOMR
   public searchCustomer(keyword: string, sort: string, status: string, page: number, size: number): Observable<any> {
      const params = { keyword, sort, status, page, size }; // Buat objek params
      const searchUrl = this.buildUrl(this.url + '/customer/all-customers', params); // Gunakan buildUrl untuk membuat URL

      console.log(searchUrl)

      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }


   //SEARCH CUSTOMR DETAIL
   public searchCustomerDetail(customerCode: string): Observable<any> {
      const searchUrl = 'http://localhost:8080/customer/detail-customer/' + customerCode;
      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }


   //SEARCH ITEM DETAIL
   public searchItemDetail(itemCode: string): Observable<any> {
      const searchUrl = 'http://localhost:8080/item/detail-item/' + itemCode;
      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }

   
   //SEARCH ORDER DETAIL
   public searchOrderDetail(orderCode: string): Observable<any> {
      const searchUrl = 'http://localhost:8080/order/detail-order/' + orderCode;
      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }


   //SEARCH CUSTOMR DETAIL
   public generateReport(): Observable<any> {
      const searchUrl = 'http://localhost:8080/report/generate';
      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }







   //SEARCH ITEMS
   public searchItem(keyword: string, sort: string, status: string, page: number, size: number): Observable<any> {
      const params = { keyword, sort, status, page, size }; // Buat objek params
      const searchUrl = this.buildUrl(this.url + '/item/all-items', params); // Gunakan buildUrl untuk membuat URL

      console.log(searchUrl)

      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }




   //SEARCH ORDER
   public searchOrder(keyword: string, sort: string, status: string, page: number, size: number): Observable<any> {
      const params = { keyword, sort, status, page, size }; // Buat objek params
      const searchUrl = this.buildUrl(this.url + '/order/all-orders', params); // Gunakan buildUrl untuk membuat URL

      console.log(searchUrl)

      return this.http.get<any>(searchUrl)
         .pipe(catchError(this.errorHandler));
   }



















   // ERROR HANDLE
   private errorHandler(error: HttpErrorResponse): Observable<never> {
      let errorMessage: string;


      if (error.error && error.error.message) {
         errorMessage = error.error.message; // Ambil pesan kesalahan dari server
      } else {
         errorMessage = 'An error occurred'; // Pesan default
      }
      throw errorMessage;
   }





}
