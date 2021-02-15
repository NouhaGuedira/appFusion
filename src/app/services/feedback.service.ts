import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feadback } from '../shared/feadback';
import {baseURL} from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient ,
    private processHTTPMsgService : ProcessHTTPMsgService) { }
      
      // return new Promise(resolve =>{
      //   setTimeout(()=> resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);
      // });
  submitFeedback(feed : Feadback): Observable<Feadback>{
    const httpOptions = { //put() have optional params : headers
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<Feadback>(baseURL +'feedback',feed, httpOptions)
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
