import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from './../../../shared/model/order.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() totalItems: number;
  @Input() subTotal: number;
  @Input()  addressSelected: any;
  @Output() confirmDetails =  new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  orderConfirmDetails(addressSelected)   {
    this.confirmDetails.emit(addressSelected);
  }
}
