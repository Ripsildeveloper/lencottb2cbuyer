import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-summary',
  templateUrl: './price-summary.component.html',
  styleUrls: ['./price-summary.component.css']
})
export class PriceSummaryComponent implements OnInit {
@Input() totalItems: number;
@Input() subTotal: number;
  constructor() { }

  ngOnInit() {
  }

}
