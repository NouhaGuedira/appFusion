import { Component, OnInit } from '@angular/core';
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
              private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promoService.getFeaturedPromotion();
    this.featuredLeader =this.leaderService.getFeaturedLeader();
  }

}
