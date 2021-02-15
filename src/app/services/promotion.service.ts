import { Injectable } from '@angular/core';
import {Promotion } from '../shared/promotion';
//import {PROMOTIONS} from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { catchError,map, delay, tap } from 'rxjs/operators';

import  {baseURL} from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, 
              private processHTTPMsgService : ProcessHTTPMsgService) { }
  
  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
                     .pipe(catchError(this.processHTTPMsgService.handleError));
  
    // return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   //simulate a server latency
    //   setTimeout(()=> resolve(PROMOTIONS) , 2000);
    // });
    //return Promise.resolve(PROMOTIONS);

  }
  getPromtion(id: string) : Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id )
                     .pipe(catchError(this.processHTTPMsgService.handleError));
  
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0] ).pipe(delay(2000));
    // return new Promise(resolve=> { 
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id) )[0]), 2000);
    // });
      //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id) )[0]);

  }
  getFeaturedPromotion() : Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions/?featured = false' ).pipe(map(proms => proms[0]))
    .pipe(tap(() =>console.log('Fetching featured promo')),
          catchError(this.processHTTPMsgService.handleError) ) ; 
          
    //return  of(PROMOTIONS.filter((promo) => (promo.featured))[0] ).pipe(delay(2000));
    // return new Promise(resolve=> { 
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.featured) )[0]), 2000);
    // });
   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]);
  }
}
