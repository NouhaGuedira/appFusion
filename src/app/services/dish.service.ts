import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
//import {DISHES} from '../shared/dishes'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable , of, zip } from 'rxjs';
import { delay, map , catchError, tap } from 'rxjs/operators';

import {ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient ,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes')
          .pipe(catchError(this.processHTTPMsgService.handleError));
    
    //of(DISHES).pipe(delay(2000));
  }

  getDishById(id: string) : Observable<Dish>{
   
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(tap( obs =>console.log('Fetching dishe details')), 
                              catchError(this.processHTTPMsgService.handleError) ) ; 
    //return of(DISHES.filter((dish) => (dish.id === id) )[0]).pipe(delay(2000));
    
    // return new Promise(resolve=> {
    //   setTimeout(()=>resolve( DISHES.filter((dish) => (dish.id === id) )[0]), 2000 );
    // });
      //return Promise.resolve(DISHES.filter((dish) => (dish.id === id) )[0]);

  }
 
  getDishIds(): Observable<string[] | any>{
    //map dishes and then map ids
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
                                .pipe(catchError(error => error));
   //return of(DISHES.map(dish=> dish.id ));
  }
 
  
  getFeaturedDish() : Observable<Dish>{
   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
    // return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
   
    // return new Promise(resolve =>{
    //   setTimeout(()=> resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
    // });
    //return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
  }
  setCommentTodish(com : Comment , id : string ) :void{
    //get the current dish
    console.log("we are in setCommentTodish()");
    
    // this.getDishById(id)
    //     .subscribe(dish => dish.comments?.push(com));
        
    //add comment to its list of comments
   // return of(Dish.comment.push(messg));
          
  }
  putDish(dish : Dish): Observable<Dish>{
    const httpOptions = { //put() have optional params : headers
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL +'dishes/' + dish.id, dish, httpOptions)
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
