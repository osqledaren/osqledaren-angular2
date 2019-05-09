import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FormSubmitService {
  // update url if google webApp is updated
  private url = 'https://script.google.com/macros/s/AKfycbyR1l6gyvPERwCX93koExow9T2hDq5Eb59jhdlW2ndx-Ny1yXdH/exec';

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
