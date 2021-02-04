import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishService} from '../services/dish.service';

    @Component({
      selector: 'app-menu',
      templateUrl: './menu.component.html',
      styleUrls: ['./menu.component.scss']
    })
export class MenuComponent implements OnInit {

  dishes: Dish[] | undefined ;//typeScrypt will affect the type implicitely

  selectedDish : Dish | undefined;

  constructor( private dishService: DishService) {}

  ngOnInit(){
    this.dishService.getDishes() //a promise if resolved then..
    .then((dishes) => this.dishes = dishes);
  }
  onSelect(dish : Dish){
    this.selectedDish = dish;
  }
}
                                                                                                             