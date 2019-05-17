import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Promotion } from './promotion.model';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  @Input() promotionsModel: Promotion;
  @Input() slideMultiStart: number;
  @Input() slideMultiEnd: number;
  @Input() sliderLength: number;
  @Input() slideMultiLength: number;
  @Output() changeMultiPlusSlider =  new EventEmitter<any>();
  @Output() changeMultiMinusSlider =  new EventEmitter<any>();
  displayClass: string;
  slideEnd: number;
  displayNone = 'displayNone';
  constructor() { }

  ngOnInit() {
  }
  plusMultiCarousel(slideStart, slideEnd, sliderLength)  {
    const end = (slideStart + 1) * slideEnd;
    const start = slideStart * slideEnd;
    if (end < sliderLength ) {
    const slide =  { slideMultiStart: start, slideMultiEnd: end  };
    this.changeMultiPlusSlider.emit(slide);
  } else {
  }
  }
  minusMultiCarousel(slideStart, slideEnd, sliderLength) {
    const end = (slideStart - 1) * slideEnd;
    const start = slideStart - slideEnd;
    if (slideStart !== 1) {
    const slide =  { slideMultiStart: start, slideMultiEnd: end  };
    this.changeMultiMinusSlider.emit(slide);
  } else {

  }
}
}
