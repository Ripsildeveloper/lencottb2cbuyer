import { Component, OnInit } from '@angular/core';
import { Banner } from './../banner/banner.model';
import { HomeService } from './../home.service';
import { Promotion } from './../promotion/promotion.model';
import { HotProduct } from './../hot-product/hot-product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner: Banner[];
  promotion: Promotion;
  promotionTable: Promotion[];
  hotProduct: HotProduct;
  slideIndex = 0;
  displayClass: string;
  slideMultiStart = 0;
  slideMultiEnd  = 4;
  slide = { slideMultiStart: 0,
    slideMultiEnd: 4 };
  sliderLength: number;
  slideMultiLength: number;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.allBanner();
    this.allHotProduct();
    this.allPromotion();
  }

  allBanner() {
    this.homeService.getAllBanner().subscribe(data => {
      this.banner = data;
    }, error => {
      console.log(error);
    });
  }
  allPromotion() {
    this.homeService.getAllPromotion().subscribe(data => {
      if (data.length > 0) {
      this.promotion  = data[0];
    }
    }, error => {
      console.log(error);
    });
  }
  allHotProduct() {
    this.homeService.getHotProducts().subscribe(data => {
      this.hotProduct = data;
    }, error => {
      console.log(error);
    });
  }
}
