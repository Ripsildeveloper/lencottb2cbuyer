import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from './../../shared/model/cart.model';
import { initNgModule } from '@angular/core/src/view/ng_module';
import {MOQ} from '../../shared/model/moq.model';
import { Router } from '@angular/router';
import { AppSetting } from '../../config/appSetting';
import { element } from '@angular/core/src/render3';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: any = [];
  cartModel: Cart;
  userId;
  subTotal  = 0;
  action;
  localImageUrlView = true;
  totalItems = 0;
  noPrductAdd = false;
  productImageUrl: string = AppSetting.productImageUrl;
  constructor(private productService: ProductService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.userId = sessionStorage.getItem('userId');
      this.localImageUrlView = true;
      this.shoppingCartUser(this.userId);
    } else {
      this.localImageUrlView = false;
      this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
      this.shopModel.forEach((val) => {
          val.showDiv = false;
      });
      this.total();
    }
  }
  orderPlaced()   {
    this.matSnackBar.open('order Placed Successfully', this.action, {
      duration: 2000,
    });
    this.router.navigate(['home/welcome']);
  }

actionPlus(product, sku) {
  if (this.localImageUrlView) {
    this.actionServerPlus(product, sku);
  } else {
    this.actionLocalPlus(product, sku);
  }
}
actionServerPlus(product, sku) {
  const totalItem: any = [];
  const cart: any = {
    productId: product,
    skuCode: sku,
    qty: 1
    };
  totalItem.push(cart);
  this.cartModel = new Cart();
  this.cartModel.userId = this.userId;
  this.cartModel.items = totalItem;
  this.productService.addToCart(this.cartModel).subscribe(data => {
  this.shopModel = data;
  this.total();
  }, error => {
    console.log(error);
  });
}
actionLocalPlus(item, skuCode) {
  const localSame = this.shopModel.find(s => s.items.skuCode === skuCode);
  localSame.items.qty++;
  sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
  this.total();
}
actionServerMinus(product, sku) {
  const cart: any = {
  productId: product,
  skuCode: sku,
  qty: 1
  };
  this.cartModel = new Cart();
  this.cartModel.userId = this.userId;
  this.cartModel.items = cart;
  this.productService.addToCartDecrement(this.cartModel).subscribe(data => {
  this.shopModel = data;
  this.total();
  }, error => {
    console.log(error);
  });
}

actionMinus(product, sku) {
  if (this.localImageUrlView) {
    this.actionServerMinus(product, sku);
  } else {
    this.actionLocalMinus(product, sku);
  }
}
  actionLocalMinus(product, skuCode)   {
    const localSame = this.shopModel.find(s => s.items.skuCode === skuCode);
    localSame.items.qty--;
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
    this.total();
  }

  shoppingCartUser(userId) {
    this.productService.shoppingUser(userId).subscribe(data => {
    this.shopModel = data;
    this.total();
    }, err => {
      console.log(err);
    });
  }
  removeCart(item, skuCode)   {
    if (this.localImageUrlView) {
      this.removeServerCart(item);
    } else {
      this.removeLocalCart(skuCode);
    }
  }
  removeLocalCart(skuCode) {
    const item = this.shopModel.find(ite => {
      return ite.items.skuCode === skuCode;
    });
    const index = this.shopModel.indexOf(item);
    this.shopModel.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
    this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
    this.total();
  }
  removeServerCart(item) {
    this.productService.deleteToCart(this.userId, item).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, err => {
      console.log(err);
    });
  }
  total() {
    this.subTotal = 0;
    this.totalItems = 0;
    const totalProduct: any = this.shopModel.map(item => item.cart_product[0]);
    const totalSet = this.shopModel.map(item => item.items);
    this.totalItems += totalSet.length;
    totalSet.map(item => {
      const priceSingle = totalProduct.find(test => test._id === item.productId);
      this.subTotal += item.qty * priceSingle.price;
    });
    sessionStorage.setItem('cartqty', JSON.stringify(this.shopModel.length));
  }
  placeOrder() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.router.navigate(['account/checkout']);
    } else {
    this.router.navigate(['account/signin']);
   }
  }
}
