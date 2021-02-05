import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes'; 
import { Observable , of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  //get all IDS and return it in an array
  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish=> dish.id ));
  }
 
  getDishes(): Observable<Dish[]>{
    return of(DISHES).pipe(delay(2000));//.toPromise();
    // return new Promise(resolve =>{
    //   //simulate a server latency with 2 second delay
    //   setTimeout(()=>resolve(DISHES) , 2000);
    // });
    //return Promise.resolve(DISHES);

  }
  getDishById(id: string) : Observable<Dish>{
    //using Observable
    return of(DISHES.filter((dish) => (dish.id === id) )[0]).pipe(delay(2000));
    // return new Promise(resolve=> {
    //   setTimeout(()=>resolve( DISHES.filter((dish) => (dish.id === id) )[0]), 2000 );
    // });
      //return Promise.resolve(DISHES.filter((dish) => (dish.id === id) )[0]);

  }
  getFeaturedDish() : Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
    // return new Promise(resolve =>{
    //   setTimeout(()=> resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
    // });
    //return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
  }
}
