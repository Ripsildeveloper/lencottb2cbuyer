import { Component, AfterContentInit, ContentChildren, ViewChild, QueryList, ElementRef, 
AfterViewInit } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements AfterContentInit, AfterViewInit {

  @ContentChildren(CarouselItemDirective, { read: ElementRef }) items
    : QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('slides') slidesContainer: ElementRef<HTMLDivElement>;

  slidesIndex = 0;
  mobileSlider = 0;
  getDevice()  {
    if (window.screen.width > 900) { // 768px portrait
      this.mobileSlider = 4;
    } else {
      this.mobileSlider = 2;
    }
  }
  get currentItem(): ElementRef<HTMLDivElement> {
    return this.items.find((item, index) => index === this.slidesIndex);
  }

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  ngAfterViewInit() {
    console.log('slides', this.slidesContainer);
  }

  onClickLeft() {
    this.getDevice();
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
    if (this.slidesIndex * this.mobileSlider > 0) {
      this.slidesIndex--;
    }
  }

  onClickRight() {
    this.getDevice();
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
    if (this.slidesIndex * this.mobileSlider < this.items.length - 1) {
      this.slidesIndex++;
    }
  }
}
