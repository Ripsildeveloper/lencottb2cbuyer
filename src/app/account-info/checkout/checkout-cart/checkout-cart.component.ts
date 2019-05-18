import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { AccountService } from './../../account.service';
import { Cart } from './../../../shared/model/cart.model';
import { initNgModule } from '@angular/core/src/view/ng_module';
import {MOQ } from './../../../shared/model/moq.model';
import { Router } from '@angular/router';
import { AppSetting } from '../../../config/appSetting';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
@Input() shopModel: any;
@Output() addPlus = new EventEmitter<Cart>();
@Output() minusPlus = new EventEmitter<Cart>();
@Output() deleteCart = new EventEmitter<Cart>();
  cartModel: Cart;
  userId;
  moqModel: MOQ;
  subTotal  = 0;
  action;
  totalItems = 0;
  productImageUrl: string = AppSetting.productImageUrl;
  constructor(private accountService: AccountService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }
  actionPlusData(product, sku)   {
    const totalItem: any = [];
    const cart: any = {
      productId: product,
      skuCode: sku,
      qty: 1
      };
    totalItem.push(cart);
    this.addPlus.emit(totalItem);
  }

  actionMinusData(product, sku) {
    const totalItem: any = [];
    const cart: any = {
      productId: product,
      skuCode: sku,
      qty: 1
      };
    this.cartModel = new Cart();
    this.cartModel.userId = this.userId;
    this.cartModel.items = cart;
    this.minusPlus.emit(cart);
  }
  removeCartData(item) {
    this.deleteCart.emit(item);
  }

}
