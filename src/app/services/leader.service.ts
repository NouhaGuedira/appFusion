import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable , of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));//.toPromise();
  //  return new Promise(resolve=>{
  //    setTimeout(()=>resolve(LEADERS),2000);
  //  });
   // return Promise.resolve(LEADERS);

  }
  getLeaderById(id: string) : Observable<Leader>{

    return of(LEADERS.filter((lead) => (lead.id === id) )[0]).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.id === id) )[0]),2000);
    // });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.id === id) )[0]);

  }
  getFeaturedLeader() : Observable<Leader>{
    return of(LEADERS.filter((lead) => (lead.featured) )[0]).pipe(delay(2000));
    // return new  Promise(resolve=>{
    //   setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.featured) )[0]),2000);
    // });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.featured))[0]);
  }
}
