import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FormSubmitService {

  constructor() { }
  submitToSheet(url) {
    console.log(url)
  }

}
