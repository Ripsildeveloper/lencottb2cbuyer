import { Component, AfterContentInit, ContentChildren, ViewChild, QueryList, ElementRef, Input,
AfterViewInit, OnInit, Output, EventEmitter} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ContentChildren(CarouselItemDirective, { read: ElementRef }) items
    : QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('slides') slidesContainer: ElementRef<HTMLDivElement>;
  @Input()   clickIndex: boolean;
  slidesIndex = 0;
  mobileSlider = 1;
  ngOnInit() {
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
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
    if (this.slidesIndex * this.mobileSlider > 0) {
      this.slidesIndex--;
    }
  }

  onClickRight() {
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth * this.mobileSlider;
    if (this.slidesIndex * this.mobileSlider < this.items.length - 1) {
      this.slidesIndex++;
    }
  }
}
