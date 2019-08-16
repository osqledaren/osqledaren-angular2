import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FormSubmitService {
  // update url if google webApp is updated
  private url = 'https://script.google.com/macros/s/AKfycbx1OecIcVeGQn0GrYzeyaFP14LDGMWcfmufonqiVAwE5VmSZNk/exec';

  constructor(private http: HttpClient) {
  }
  submitToSheet(formData: any) {
    this.http.post(this.url, JSON.stringify(formData))
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }
}
