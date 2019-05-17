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
  promotion: Promotion[];
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


  plusMultiCarousel(slide)   {
    this.slideMultiStart = this.slideMultiStart + 1;
    /* this.slideMultiEnd = slide.slideMultiEnd; */
    this.slideMultiLength = slide.slideMultiEnd;
    const part = this.promotion.slice(slide.slideMultiStart, slide.slideMultiEnd);
    this.promotionTable = part;
  }
  minusMultiCarousel(slide)   {
    this.slideMultiStart = slide.slideMultiStart + 1;
    /* this.slideMultiEnd = slide.slideMultiEnd; */
    this.slideMultiLength = slide.slideMultiEnd;
    const part = this.promotion.slice(slide.slideMultiStart, slide.slideMultiEnd);
    this.promotionTable = part;
  }

  allBanner() {
    this.homeService.getAllBanner().subscribe(data => {
      this.banner = data;
    }, error => {
      console.log(error);
    });
  }
  minusSlides(n) {
    const min = --n;
    if (min < 0) {
      this.slideIndex = this.banner.length - 1;
    } else {
      this.slideIndex = min;
    }
  }
  plusSlides(n) {
    if (this.banner.length - 1 < n || this.banner.length - 1 <= n) {
      this.slideIndex = 0;
    } else {
      this.slideIndex = ++n;
    }
  }
  allPromotion() {
    this.homeService.getAllPromotion().subscribe(data => {
      this.promotion = data;
      console.log(this.promotion);
      this.promotion  = this.promotion[0].joinedtable;
      this.sliderLength = this.promotion.length;
      this.plusMultiCarousel(this.slide);
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
