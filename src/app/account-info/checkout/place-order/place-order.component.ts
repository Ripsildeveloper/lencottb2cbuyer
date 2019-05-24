import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
/* import { ProductService } from '../product.service';
import { Product } from '../../shared/model/product.model';
import {SingleProductOrder} from '../../shared/model/singleProductOrder.model';
import {AddressModel} from '../../account-info/address/address.model';
import {Order} from '../../shared/model/order.model'; */
import { AddressModel } from './../../address/address.model';
import { RegModel } from './../../registration/registration.model';
import { AddressService } from './../../address/address.service';
import { AccountService } from './../../account.service';
import { Cart } from './../../../shared/model/cart.model';
import { Order } from './../../../shared/model/order.model';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  userId: string;
  addressModel: AddressModel[];
  regModel: RegModel;
  orderForm: FormGroup;
  shopModel: any = [];
  cartModel: Cart;
  id;
  orderModel: Order;
  addressSelected: AddressModel;
  subTotal = 0;
  totalItems = 0;
  packSum: number;
  checkOutofStack: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private router: Router, private addressService: AddressService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
    /* this.viewSingleProduct(); */
    this.userId = sessionStorage.getItem('userId');
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.userId = sessionStorage.getItem('userId');
      this.getAddress();
      this.shoppingCartUser(this.userId);
    } else {
      this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
    }
  }

  actionPlus(totalItem) {
    this.cartModel = new Cart();
    this.cartModel.userId = this.userId;
    this.cartModel.items = totalItem;
    this.accountService.addToCartCheckout(this.cartModel).subscribe(data => {
    this.shopModel = data;
    this.total();
    }, error => {
      console.log(error);
    });
  }
  actionMinus(totalItem) {
    this.cartModel = new Cart();
    this.cartModel.userId = this.userId;
    this.cartModel.items = totalItem;
    this.accountService.addToCartDecrement(this.cartModel).subscribe(data => {
    this.shopModel = data;
    this.total();
    }, error => {
      console.log(error);
    });
  }
  removeCart(item) {
    this.accountService.deleteToCart(this.userId, item).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, err => {
      console.log(err);
    });
  }
  createForm() {
    this.orderForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailId: [''],
      streetAddress: [''],
      building: [''],
      landmark: [''],
      city: [''],
      state: [''],
      pincode: [''],
      qty: [''],
      productPrice: [''],
      totalPrice: ['']
    });
  }

  getAddress() {
    this.accountService.getCustomerDetails(this.userId).subscribe(data => {
      this.regModel = data;
      this.addressModel = data.addressDetails;
      this.addressSelected = this.addressModel[0];
    }, error => {
      console.log(error);
    });
  }
  addAddressEvent() {
    this.addressService.openAddress().subscribe(
      res => {
        if (res) {
          this.getAddress();
        }
      }
    );
  }
  selectedAddress(event) {
    if (event) {
      this.addressSelected = event;
    }
  }
  editAddress(data) {
    console.log(data);
    this.addressService.editAddress(data).subscribe(
      res => {
        if (res) {
          this.getAddress();
        }
      }
    );
  }

  confirmOrderData(address) {
    const totalItem = this.shopModel.map(element => element.items);
    this.orderModel = new Order();
    this.orderModel.customerId = this.userId;
    this.orderModel.addressDetails = address;
    this.orderModel.items = totalItem;
    this.orderModel.total = this.subTotal;
    this.accountService.confirmOrder(this.orderModel).subscribe(data => {
    this.orderModel = data;
    this.qtyUpdate(this.orderModel);
    this.deleteCart(this.userId);
    }, err => {
      console.log(err);
    });
  }
  shoppingCartUser(userId) {
    this.accountService.shoppingUser(userId).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, err => {
      console.log(err);
    });
  }
  deleteData(addressId) {
    this.accountService.customerAddressDelete(this.userId, addressId).subscribe(data => {
      this.regModel = data;
      this.addressModel = data.addressDetails;
      this.addressSelected = this.addressModel[0];
    }, error => {
      console.log(error);
    });
  }
  deleteCart(userId) {
    this.accountService.deleteAllCart(userId).subscribe(data => {
      this.shopModel = data;
      sessionStorage.setItem('cartqty', JSON.stringify(this.shopModel.length));
      this.router.navigate(['/account/order']);
    }, error => {
      console.log(error);
    });
  }
  qtyUpdate(order) {
    this.accountService.confirmQtyOrder(order).subscribe(data => {
      this.shopModel = data;
    }, error => {
      console.log(error);
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

}
