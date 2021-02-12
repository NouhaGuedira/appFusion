import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Observable } from 'rxjs';
import { expand, flyInOut } from '../animations/app.animation';

    @Component({
      selector: 'app-menu',
      templateUrl: './menu.component.html',
      styleUrls: ['./menu.component.scss'],
      host : { //when we enter the view compornent 
        '[@flyInOut]' : 'true',// !
        'style' : 'display : block ;'
      },
      animations : [
        flyInOut(),
        expand()
      ]
    })
export class MenuComponent implements OnInit {

  dishes: Dish[] | undefined ;//typeScrypt will affect the type implicitely
  errorMsg : string | undefined; 
  //selectedDish : Dish | undefined;

  constructor(@Inject('BaseURL') public BaseURL :any,
               private dishService: DishService) {}

  ngOnInit(){
    this.dishService.getDishes() //subscribe to the observable returned
    .subscribe(dishes =>this.dishes = dishes, 
                errormsg => this.errorMsg = <any>errormsg);//then((dishes) => this.dishes = dishes);
  }  
   onSelect(dish : Dish){
  //   this.selectedDish = dish;
  }
}
                                                                                                             