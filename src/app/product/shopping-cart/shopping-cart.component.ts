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
  moqModel: MOQ;
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
  actionPlus(product) {
    const totalItem: any = [];
    const cart = {
      productId: product,
      pack: 1
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
  actionMinus(product, pack, moq) {
    const cart: any = {
      productId: product,
      pack: 1
    };
    if ( moq < pack ) {
      this.cartModel = new Cart();
      this.cartModel.userId = this.userId;
      this.cartModel.items = cart;
      this.productService.addToCartDecrement(this.cartModel).subscribe(data => {
      this.shopModel = data;
      this.total();
      }, error => {
        console.log(error);
      });
    } else {
      this.shopModel.forEach((val) => {
        if (val.items.productId === product) {
          val.items.showCondtion = true;
        } else {
          val.items.showCondtion = false;
        }
      });
    }
  }
  removeLocalCart(product) {
    const item = this.shopModel.find(ite => {
      return ite.productId === product.productId;
    });
    const index = this.shopModel.indexOf(item);
    this.shopModel.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
    this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
    this.total();
  }
  total() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.totalQty();
    } else {
      this.subTotal = 0;
      this.totalItems = 0;
      const totalProduct: any = this.shopModel.map(item => item.cart_product[0]);
      const totalSet = this.shopModel.map(item => item);
      totalSet.map(item => {
        this.totalItems += item.pack;
        const priceSingle = totalProduct.find(test =>  test._id === item.productId);
        const totalRatio = priceSingle.size;
        priceSingle.totalRatio = 0;
        totalRatio.forEach( elem => {
          priceSingle.totalRatio += elem.ratio * priceSingle.moq;
        });
        this.subTotal += item.pack *  priceSingle.totalRatio  * priceSingle.price;
      });
      sessionStorage.setItem('pack', JSON.stringify(this.shopModel.length));
    }
  }
  orderPlaced()   {
    this.matSnackBar.open('order Placed Successfully', this.action, {
      duration: 2000,
    });
    this.router.navigate(['home/welcome']);
  }
  actionLocalMinus(item, moq, pack)   {
   /*  item.pack--;
    if (item.set === 0) {
      this.removeLocalCart(item);
    } */
    if (  moq < pack  ) {
      item.pack--;
      sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
      this.total();
    } else {
      this.shopModel.forEach((val) => {
        if (val.productId === item.productId) {
          val.showDiv = true;
        } else {
          val.showDiv = false;
        }
      });
    }
  }
  actionLocalPlus(item) {
    item.pack++;
    this.shopModel.forEach((val) => {
        val.showDiv = false;
    });
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
    this.total();
  }
  totalQty() {
    let pack = 0;
    this.subTotal = 0;
    this.totalItems = 0;

    const totalProduct: any = this.shopModel.map(item => item.cart_product[0]);
    const totalSet = this.shopModel.map(item => item.items);
    totalSet.map(item => {
      pack += item.pack;
      this.totalItems += item.pack;
      const priceSingle = totalProduct.find(test => test._id === item.productId);
      const totalRatio = priceSingle.size;
      priceSingle.totalRatio = 0;
      totalRatio.forEach( elem => {
        priceSingle.totalRatio += elem.ratio * priceSingle.moq;
      });
      this.subTotal += item.pack * priceSingle.totalRatio * priceSingle.price;
    });
    sessionStorage.setItem('pack', JSON.stringify(this.shopModel.length));
  }
  shoppingCartUser(userId) {
    this.productService.shoppingUser(userId).subscribe(data => {
    this.shopModel = data;
    this.total();
    }, err => {
      console.log(err);
    });
  }

  removeCart(item) {
    this.productService.deleteToCart(this.userId, item).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, err => {
      console.log(err);
    });
  }
  placeOrder() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.router.navigate(['account/checkout']);
    } else {
    this.router.navigate(['account/signin']);
   }
  }
}
