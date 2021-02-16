import { Component, Inject, OnInit } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader }  from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss']
})
export class LeaderComponent implements OnInit {

  leaders : Leader[] | undefined;
  leaderError : string | undefined;

  constructor (private LeaderService : LeaderService,
              @Inject('BaseURL') public BaseURL :any ) { }

  ngOnInit(): void {
    this.LeaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,error => this.leaderError = error);//then((leaders) => this.leaders = leaders);
  }
}
