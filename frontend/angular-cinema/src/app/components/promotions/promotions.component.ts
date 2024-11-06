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
  lang: string = '';

  constructor(private promotionsService: PromotionsService){}
  ngOnInit(): void {
    this.getPromotionsList();
    this.lang = localStorage.getItem('language') || 'pl'; 
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
