import { Component} from '@angular/core';
import {UILoadableComponent} from '../../ui/abstract.ui-loadable.component';
import {UIViewLoaderService} from '../../ui/ui-view-loader.service';
import {ArchiveService} from '../../archive/archive.service';
import {Archive} from '../../archive/archive.enum';

import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import {FormSubmitService} from '../form-submit.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent extends UILoadableComponent {

  // list of occupations for for creating checkboxes ini form
  occupationPref = [
    {occ: 'web'},
    {occ: 'writer'},
    {occ: 'photo'},
    {occ: 'illustrator'},
    {occ: 'media'}
  ];

  // create formControlls for the occupation checkboxes
  checkboxes = this.occupationPref.map(occupation =>
    new FormControl(null));

  // Data to be validated and sent to sheet
  applyForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    occupation: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    about: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  }, {updateOn: 'blur'});

  submit: FormSubmitService;
  constructor(loaderService: UIViewLoaderService, private archiveService: ArchiveService, submit: FormSubmitService) {
    super(loaderService);
    this.submit = submit;
  }

  // if form is valid send data to sheet
  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.applyForm.value)
    if(this.applyForm.valid){
      this.submit.submitToSheet(this.applyForm.value);
      this.applyForm.reset();
    }
    else{
      console.log('form invalid')
    }
  }

  // methods for accesing controlls in html component
  get name(){
    return this.applyForm.get('name')
  }
  get email(){
    return this.applyForm.get('email')
  }
  get occupation(){
    return this.applyForm.get('occupation')
  }
  get about(){
    return this.applyForm.get('about')
  }

  init() {
    this.archiveService.activate(Archive.article);
    this.loaded();
  }

}
