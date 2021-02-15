import { Injectable } from '@angular/core';
//import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable , of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import {baseURL} from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient ,private processHTTPMsgService : ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{

    console.log("fetching leaders");
    return this.http.get<Leader[]>(baseURL + 'leadership')
                    .pipe(catchError(this.processHTTPMsgService.handleError));
   
   // return of(LEADERS).pipe(delay(2000));//.toPromise();
  //  return new Promise(resolve=>{
  //    setTimeout(()=>resolve(LEADERS),2000);
  //  });
   // return Promise.resolve(LEADERS);

  }
  getLeaderById(id: string) : Observable<Leader>{
    console.log("fetching one leader ");
    return this.http.get<Leader>(baseURL + 'leadership/'+ id )
                    .pipe(catchError(this.processHTTPMsgService.handleError));
   
    //return of(LEADERS.filter((lead) => (lead.id === id) )[0]).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.id === id) )[0]),2000);
    // });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.id === id) )[0]);
  }

  getFeaturedLeader() : Observable<Leader>{
    console.log("fetching featured leader ");
    return this.http.get<Leader[]>(baseURL + 'leadership/?featured=true')
                    .pipe(map(leaders => leaders[0]))
                    .pipe(catchError(this.processHTTPMsgService.handleError));
    
    //return of(LEADERS.filter((lead) => (lead.featured) )[0]).pipe(delay(2000));
    // return new  Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.featured) )[0]),2000);
    // });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.featured))[0]);
  }
}
