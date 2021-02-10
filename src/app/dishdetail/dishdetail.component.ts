import { Component, OnInit,Input, ViewChild, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import  { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { catchError, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseurl';

// Js Object


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
@ViewChild('fform') commentFormDirective : any; //to access the html elements of the form 

 dish: Dish | undefined;
 dishIds : string[] | undefined;
 currentId : string | undefined ;
 prev: string | undefined;
 next: string | undefined ;
 commentForm = new FormGroup({});//passed from the template
 theComment : Comment | undefined ;//used in onSubmit form
 errorMsg : string | undefined ; 


  constructor(private dishService : DishService ,
              private location : Location ,
              private route : ActivatedRoute,
              private formBuilder : FormBuilder,
              @Inject('BaseURL') public BaseURL : any) { 

    //initialize the reactive form
    this.initcommentForm();
     
   }
 //adding formErrors array for validation of fields 
  //in order to map each field name with the message error 
  formErrors : { [k: string]: string | undefined} = { //index signature explicitly declared
    'author': '',
    'comment': '',
  };

  validationMessages : { [fieldName:string] : { [k: string]: string | undefined}  } = { //index signature explicitly declared
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment message is required.',
      'minlength':     'Comment message must be at least 2 characters long.',
    },
  };

  ngOnInit(): void {
   // let id = this.route.snapshot.params['id'];//params is an observable obtains params from the url whenever it changes (a snapshot = in a moment of time)
    this.dishService.getDishIds().subscribe(dishIdsArr => this.dishIds = dishIdsArr ,
                                            catchError(errormsg => this.errorMsg = errormsg) );
    //pipe in the params observable values and use each one of them in our service methode then subsrcibe the output value
    this.route.params.pipe(switchMap((params: Params)=> this.dishService.getDishById(params['id'])))
                          .subscribe(currentdish =>{this.dish= currentdish;
                                      this.currentId = currentdish.id;
                                      this.setNextPrev(currentdish.id!); 
                                    } , 
                                    catchError(error => this.errorMsg = error));
    
    //this.dishService.getDishById(id).subscribe((dish)=>this.dish = dish);//.then((dish)=>this.dish = dish);

  }
  // get the previous and next values of the current index(fetched from server)
  setNextPrev(dishId : string) :void {
    const index = this.dishIds!.indexOf(dishId);
    const prevId = (index==0? this.dishIds!.length -1 : index - 1); //if index is the first elements prevId=the last index of the array
    this.prev = this.dishIds![prevId];

    const nextId = ( (index>= this.dishIds!.length-1 )?0 :index + 1); //if the index is the last element nextId=the first index 
    this.next = this.dishIds![nextId];
  }
  goBack():void{
    this.location.back();
  }
  // ---------------------Comment form Stuff------------------------------------------------
  initcommentForm(){
    this.commentForm = this.formBuilder.group({
      rating : 5,
      comment : ['',[Validators.required, Validators.minLength(2)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      date:''//to include the current date once the comment is submited

    });
    //on change update the formBuilder
     this.onChangesComment();
  }
  onChangesComment(){
    //trigger changes
    this.commentForm!.valueChanges.subscribe(data => this.validateValues(data));
    
  }
  validateValues(dataForm : FormGroup){
    if(this.commentForm){//when we have the form we evaluate it validation
      const form = this.commentForm; 
      for(const field in this.formErrors){
        //cleat previous messages
        this.formErrors[field] = '';
        const currentField = form.get(field);
        //when the currentField is invalid get all errors and map them to formError'fields
        if(currentField && currentField.dirty && currentField.invalid){
          const messages = this.validationMessages[field];//'key' : "message alert",..
          console.log("messages=", messages);

          for(const key in currentField.errors){
           this.formErrors[field] += messages[key]+'';
          }
        }
      }
    } 
    //if there is not form submited do nothing
    return;
  }
  submitComment(){
    //init date 
    const date = new Date();
    this.commentForm.value.date = date.toDateString();//Month 2, year
    this.theComment = this.commentForm.value;//map values submited to my object model
    //insert to comments array in the current dish
    //this.dishService.setCommentTodish(this.theComment! , this.currentId!);
    this.dish!.comments!.push(this.theComment!);
    //console.log("form comment =", );
    //reset the form
    this.commentForm.reset({

      rating : 5,
      comment : '',
      author: '',
      //date:'' //to include the current date once the comment is submited

    });
    this.commentFormDirective.resetForm();//reset validators
    console.log("after resetForm =", this.commentFormDirective);
    //push comment
    
  }
}
