import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegModel } from './registration/registration.model';
import { CardDetailModel } from './card-details/cardDetails.model';
import { Cart } from './../shared/model/cart.model';
import { Product } from './../shared/model/product.model';
import { Order } from './../shared/model/order.model';
import { AddressModel } from './address/address.model';
import { ProfileModel } from './profile/profile.model';
import { SignIn } from './signin/signIn.model';
import { AppSetting } from './../config/appSetting';
import { Observable, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  getregForm(holder): Observable<RegModel> {
    const urlway = this.serviceUrl + 'registration';
    return this.http.post<RegModel>(urlway, holder);
  }

  getcardDetails(cardHolder, userId): Observable<CardDetailModel> {
    const urlcard = this.serviceUrl + 'cardupdate/' + userId;
    return this.http.put<CardDetailModel>(urlcard, cardHolder);
  }
  getaddressDetails(addressHolder, userId): Observable<AddressModel> {
    const urladdress = this.serviceUrl + 'addressupdate/' + userId;
    return this.http.put<AddressModel>(urladdress, addressHolder);
  }


  getprofileDetails(profileHolder, userId): Observable<RegModel[]> {
    const urlprofile = this.serviceUrl + 'profileupdate/' + userId;
    return this.http.put<RegModel[]>(urlprofile, profileHolder);
  }
  getCustomerDetails(userId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'customerdetail/' + userId;
    return this.http.get<RegModel>(urlprofile);
  }
  customerAddressDelete(userId, addressId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'address/' + userId + '/delete/' + addressId;
    return this.http.delete<RegModel>(urlprofile);
  }
  customerAddressUpdate(userId, addressId, updateDetails): Observable<any> {
    const urlprofile = this.serviceUrl + 'address/' + userId + '/update/' + addressId;
    return this.http.put<any>(urlprofile, updateDetails);
  }
  customerCardDelete(userId, cardId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'card/' + userId + '/delete/' + cardId;
    return this.http.delete<RegModel>(urlprofile);
  }
  signIn(data: SignIn): Observable<any> {
    const signInurl = 'admin/validate';
    const url: string = this.serviceUrl + signInurl;
    return this.http.post<SignIn>(url, data);
  }
  addToCartCheckout(cart): Observable<Cart> {
    const cartUrl = 'cart/';
    const url: string = this.serviceUrl + cartUrl;
    return this.http.post<Cart>(url, cart);
  }

  getCustomerOrderDetails(userId): Observable<Order> {
    const cartUrl = 'orderview/';
    const url: string = this.serviceUrl + cartUrl + userId;
    return this.http.get<Order>(url);
  }

  addToCartDecrement(cart): Observable<Cart> {
    const cartUrl = 'findcartproduct/';
    const url: string = this.serviceUrl + cartUrl;
    return this.http.post<Cart>(url, cart);
  }
  addToCart(cart): Observable<Cart> {
    const cartUrl = 'cart';
    const url: string = this.serviceUrl + cartUrl;
    return this.http.post<Cart>(url, cart);
  }

  deleteToCart(userid, proId) {
    const cartUrl = 'deletecart/';
    const productUrl = '/itemId/';
    const url: string = this.serviceUrl + cartUrl + userid + productUrl + proId;
    return this.http.delete<Cart>(url);
  }
  deleteAllCart(carId) {
    const cartUrl = 'deletecart/';
    const url: string = this.serviceUrl + cartUrl + carId;
    return this.http.delete<Cart>(url);
  }
  shoppingUser(userId) {
    const shoppingUrl = 'findcart/';
    const url: string = this.serviceUrl + shoppingUrl + userId;
    return this.http.get<Cart>(url);
  }
  shoppingCart() {
    const shoppingUrl = 'shopping/';
    const url: string = this.serviceUrl + shoppingUrl;
    return this.http.get<Product>(url);
  }
  addToCartMinus(cart) {
    const cartUrl = 'cart/';
    const productUrl = '/decproduct/';
    const url: string = this.serviceUrl + cartUrl + cart.userId + productUrl + cart.product.productId;
    return this.http.put<Product>(url, cart);
  }
  confirmOrder(order) {
    const orderUrl = 'order/';
    const url: string = this.serviceUrl + orderUrl;
    return this.http.put<Order>(url, order);
  }
  confirmQtyOrder(order) {
    const orderUrl = 'updateqtyproduct/';
    const url: string = this.serviceUrl + orderUrl + order.orderId;
    return this.http.put<Order>(url, order);
  }

}
