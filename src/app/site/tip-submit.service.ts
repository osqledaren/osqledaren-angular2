import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class TipSubmitService {
  // url from slack app
  private url = 'https://hooks.slack.com/services/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';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  };
  constructor(private http: HttpClient) {
  }

  submitToSlack(message) {
    let data = {"text": message}
    this.http.post(
      this.url,
      data,
      this.httpOptions

      )
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }
}
