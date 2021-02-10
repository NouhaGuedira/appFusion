import { Component, OnInit ,Inject } from '@angular/core';
import {Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion } from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  dish: Dish | undefined;
  promotion : Promotion | undefined;
  featuredLeader : Leader | undefined ;

  constructor(private dishService : DishService,
              private promoService : PromotionService,
              private leaderService : LeaderService,
              @Inject('BaseURL') public BaseURL : any) { }

  ngOnInit(): void {
    //  this.dishService.getFeaturedDish().then((dish)=>this.dish = dish);
    //  this.promoService.getFeaturedPromotion().then((prom)=>this.promotion = prom);
    //  this.leaderService.getFeaturedLeader().then(( fLeader )=>  this.featuredLeader = fLeader);

     this.dishService.getFeaturedDish().subscribe(dish =>this.dish = dish);
     this.promoService.getFeaturedPromotion().subscribe(prom =>this.promotion = prom);
     this.leaderService.getFeaturedLeader().subscribe( fLeader =>  this.featuredLeader = fLeader);
  }

}
