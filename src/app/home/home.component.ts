import { Component, OnInit ,Inject } from '@angular/core';
import {Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion } from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { catchError } from 'rxjs/operators';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host : {
    '[@flyInOut]': 'true',
    'style' : 'display : block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  
  dish: Dish | undefined;
  promotion : Promotion | undefined;
  featuredLeader : Leader | undefined ;
  dish_msgError : string |undefined ; 
  promo_msgError : string |undefined ; 
  leader_msgError : string |undefined ; 
  
  constructor(private dishService : DishService,
              private promoService : PromotionService,
              private leaderService : LeaderService,
              @Inject('BaseURL') public BaseURL : any) { }

  ngOnInit(): void {
    //  this.dishService.getFeaturedDish().then((dish)=>this.dish = dish);
    //  this.promoService.getFeaturedPromotion().then((prom)=>this.promotion = prom);
    //  this.leaderService.getFeaturedLeader().then(( fLeader )=>  this.featuredLeader = fLeader);

     this.dishService.getFeaturedDish().subscribe(dish =>this.dish = dish , catchError(error=> this.dish_msgError = error));
     this.promoService.getFeaturedPromotion().subscribe(prom =>this.promotion = prom , catchError(error=> this.promo_msgError = error));
     this.leaderService.getFeaturedLeader().subscribe( fLeader =>  this.featuredLeader = fLeader , catchError(error=> this.leader_msgError = error));
  }

}
