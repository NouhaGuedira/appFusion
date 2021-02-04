import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import {Feadback , ContactType} from '../shared/feadback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

 // feedbackForm : FormGroup ;
  feedbackForm = new FormGroup ({});
  feedback : Feadback | undefined;
  contactType = ContactType;
  testing :string | undefined;

  constructor(private fb : FormBuilder) { 
    //this.feedbackForm =  this.fb.group({});
    this.createForm();
    this.testing = "je teste ";
  }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm =this.fb.group({ //our data structure 
      
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telnum: ['' ,Validators.required],
      email: ['',Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''

    });
  }
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log("on submit",this.feedback);
    //for reactive forms validation
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    console.log("after reset",this.feedbackForm);
  }
}
