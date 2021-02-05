import { Component, OnInit,Input } from '@angular/core';
import {Dish} from '../shared/dish';
import  { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
// Js Object


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

// @Input()
 dish: Dish | undefined;
 dishIds : string[] | undefined;
 prev: string | undefined;
 next: string | undefined ;

  constructor(private dishService : DishService ,
              private location : Location ,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
   // let id = this.route.snapshot.params['id'];//params is an observable obtains params from the url whenever it changes (a snapshot = in a moment of time)
    this.dishService.getDishIds().subscribe(dishIdsArr => this.dishIds = dishIdsArr );
    //pipe in the params observable values and use each one of them in our service methode then subsrcibe the output value
    this.route.params.pipe(switchMap((params: Params)=> this.dishService.getDishById(params['id'])))
                          .subscribe(currentdish =>{this.dish= currentdish;
                                      this.setNextPrev(currentdish.id!); } )//! means the value can be trusted its not null ! 
    
    
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
  
}
