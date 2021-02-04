import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Promise<Leader[]>{
   return new Promise(resolve=>{
     setTimeout(()=>resolve(LEADERS),2000);
   });
   // return Promise.resolve(LEADERS);

  }
  getLeaderById(id: string) : Promise<Leader>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.id === id) )[0]),2000);
    });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.id === id) )[0]);

  }
  getFeaturedLeader() : Promise<Leader>{
    return new  Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.featured) )[0]),2000);
    });
    //return Promise.resolve(LEADERS.filter((lead) => (lead.featured))[0]);
  }
}
