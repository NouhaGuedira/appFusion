import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import {Feadback , ContactType} from '../shared/feadback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup ;

  feedback : Feadback | undefined;
  contactType = ContactType;
  testing :string | undefined;

  constructor(private fb : FormBuilder) { 
    this.feedbackForm =  this.fb.group({});
    this.createForm();
    this.testing = "je teste ";
  }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm =this.fb.group({ //our data structure 
      
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''

    });
  }
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();

  }
}
