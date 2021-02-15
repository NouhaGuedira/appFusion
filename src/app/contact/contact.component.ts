import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { FeedbackService } from '../services/feedback.service';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import {Feadback , ContactType} from '../shared/feadback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host :{
    '[@flyInOut]': 'true',
    'style' : 'display : block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
@ViewChild('fform') feedbackFormDirective: any;//HTMLElement | undefined;

 // feedbackForm : FormGroup ;
  feedbackForm = new FormGroup ({});
  feedback : Feadback | undefined;
  feedSubmition : Feadback | undefined;//val for returning the new feedback submited 
  feedError : string |undefined;
  contactType = ContactType;
  testing :string | undefined;
  startState = true;//form not submited yet
  loading = false;//form submited waiting for return
  showFormState = false ; //form submited with success

  constructor(private fb : FormBuilder , private feedService : FeedbackService) { 
    //this.feedbackForm =  this.fb.group({});
    this.createForm();
    this.testing = "je teste ";
  }

  ngOnInit(): void {
  }

  //adding formErrors array for validation of fields 
  //in order to map each field name with the message error 
  formErrors : { [k: string]: string | undefined} = { //index signature explicitly declared
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages : { [fieldName:string] : { [k: string]: string | undefined}  } = { //index signature explicitly declared
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  createForm(){
    this.feedbackForm =this.fb.group({ //our data structure 
      
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.onChanges();

  }

  onChanges(): void{
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    //reset validation messages now

  }

  onValueChanged(data?: any){
    if(this.feedbackForm){
        const form = this.feedbackForm;
        //control each field set by the user input
        //check wether its invalid 
        //if invalid we get the specific message for this case 
        //and map it with the surrent field name in our formError object
        for(const field in this.formErrors){
          if(this.formErrors.hasOwnProperty(field)) { //
             // clear previous error message (if any)
             this.formErrors[field] = '';
             const control = form.get(field);
             if(control && control.dirty && control.invalid){
               const messages = this.validationMessages[field]; //we map the messages to our current field name object of errorsMessages

               for (const key in control.errors) {
                  if (control.errors.hasOwnProperty(key)) {
                    this.formErrors[field] += messages[key] + ' ';
                  }
                }
              }
          }
        }
    }
    return;
  }
  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log("on submit feed",this.feedback);
    this.loading = true;
     // this.loadingState = true;
    //post data to server after 5 min
    this.feedService.submitFeedback(this.feedback!)
                    .subscribe((feed) => {
                        this.feedSubmition= feed;
                        this.startState = false ;
                        setTimeout(()=>{
                          this.showFormState = false;
                          this.startState = true;
                        },5000);
                      },
                    (error)=>{console.error('error caught in feedback submition');
                              this.feedError = error; 
                              this.loading = false;
                              },
                     ()=>{this.loading = false; 
                          this.showFormState = true;} 
                    ); 
    //first show form then after 5 sec hide it
    // this.showFormState = true
    // setTimeout(()=>{
    //   this.showFormState = false;
    //   this.startState = true;
    // },5000);
      
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
    console.log("after reset feed",this.feedbackForm);
    this.feedbackFormDirective.resetForm(); //reset all form values - validators also
    //console.log("after resetForm feed",this.feedbackFormDirective);
    
  }
}
