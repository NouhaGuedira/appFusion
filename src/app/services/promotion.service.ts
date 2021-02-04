import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  
  getPromotions(): Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   //simulate a server latency
    //   setTimeout(()=> resolve(PROMOTIONS) , 2000);
    // });
    //return Promise.resolve(PROMOTIONS);

  }
  getPromtion(id: string) : Observable<Promotion>{
    
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0] ).pipe(delay(2000));
    // return new Promise(resolve=> { 
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id) )[0]), 2000);
    // });
      //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id) )[0]);

  }
  getFeaturedPromotion() : Observable<Promotion>{
    return  of(PROMOTIONS.filter((promo) => (promo.featured))[0] ).pipe(delay(2000));
    // return new Promise(resolve=> { 
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.featured) )[0]), 2000);
    // });
   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }
}
