import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../../services/promotions.service';
import { Promotions } from '../../common/promotions';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent implements OnInit{

  promotions: Promotions[]=[];
  selectedPromotion: Promotions | undefined

  constructor(private promotionsService: PromotionsService){}
  ngOnInit(): void {
    this.getPromotionsList();
  }

  selectPromotion(promotionId: number){
    this.promotionsService.getPromotionById(promotionId).subscribe(
      data=>{
        this.selectedPromotion = data;
      }
    )
  }

  getPromotionsList(){
    this.promotionsService.getPromotionsList().subscribe(
      data =>{
        this.promotions = data;
      }
    )
  }
}
