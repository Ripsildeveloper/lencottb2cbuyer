import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from '../../shared/model/cart.model';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productModel: Product;
  id;
  showRelatedProducts;
  action;
  productId;
  relatedProducts = [];
  primeHide: boolean;
  showImages: boolean;
  selectedSmallImg: any;
  selectedImg;
  cartModel: Cart;
  shopModel: any = [];
  message;
  noPrductAdd = false;
  selectedItem: any;
  selectedSize: boolean;
  /* updateQtyTrue = false;
  labelSuccess = 'labelSuccess';
  labelDanger = 'labelDanger';
  displayClass = this.labelSuccess;
  stockItemStatus = 'Available'; */
  constructor(public productService: ProductService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewSingleProduct();
  }

  sizeSelect(itemselect: any) {
    this.selectedItem = itemselect;
  }

  viewSingleProduct() {
    this.productService.getSingleProducts(this.id).subscribe(data => {
      this.productModel = data;
    /*   this.productModel.size.map(element => {
        this.packSum += +element.ratio * this.productModel.moq;
        if (element.sizeQty <= 0 ) {
          element.qtyCheck = true;
          this.updateQtyTrue = element.qtyCheck;
          this.displayClass = this.labelDanger;
          this.stockItemStatus = 'Not Available';
        }
      }); */
      /* this.productModel.size.forEach(element => {
        element.setCount = 0;
      }); */
      /* if (data.styleCode === '' || data.styleCode === undefined || data.styleCode === null) {
          this.showRelatedProducts = false;
          this.productModel = data;
        } else {
          this.showRelatedProducts = true;
          this.productService.getRelatedProducts(data).subscribe(relatedProductData => {
            console.log('related products', relatedProductData);
            relatedProductData.forEach(element => {
              if (element._id !== this.id) {
                this.relatedProducts.push(element);
              }
            });
            this.productModel = relatedProductData.find(e => e._id === this.id);
          }, err => {
            console.log(err);
          });
        } */
    }, err => {
      console.log(err);
    });
  }
  clickImg(data) {
    this.primeHide = true;
    this.showImages = true;
    this.selectedSmallImg = data;
    this.selectedImg = data;
  }
  relatedProduct(element) {
    this.relatedProducts.push(this.productModel);
    this.productModel = element;
    this.primeHide = false;
    this.showImages = false;
    const index = this.relatedProducts.indexOf(element);
    if (index !== -1) {
      this.relatedProducts.splice(index, 1);
    }
  }
  selectedItems(productId, sku) {
    if (!this.selectedItem) {
      this.selectedSize =  true;
    } else {
      this.selectedSize =  false;
      this.skuProductAddToCart(productId, sku);
    }
  }
  skuProductAddToCart(productId, sku) {
    const userId = sessionStorage.getItem('userId');
    this.addToCartServer(userId, productId, sku);
    /* const userId = sessionStorage.getItem('userId');
    if (JSON.parse(sessionStorage.getItem('login'))) {
      if ( moq <= count ) {
        this.addToCartServer(userId, productId, count, moq,  packSumTotal, sizeData);
      } else {
        setTimeout(() => {
          this.noPrductAdd = true;
        }, 100);
      }
    } else {
      if (moq <= count) {
        this.addToCartLocal(productId, count, moq, packSumTotal, sizeData);
      } else {
        setTimeout(() => {
          this.noPrductAdd = true;
        }, 100);
      }
    } */
  }
  addToCartLocal(product, count, productMoq, packSumTotal, sizeData) {
    const cartLocal = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cartLocal.length === 0) {
      const totalItem: any = [];
      const currentProduct: any = [];
      currentProduct.push(this.productModel);
      const cart = {
        productId: product,
        pack: count,
        moq: productMoq,
        ratioQty: packSumTotal,
        size: sizeData,
        cart_product: currentProduct
      };
      totalItem.push(cart);
      this.message = 'Product Added To Cart';
      sessionStorage.setItem('cart', JSON.stringify(totalItem));
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    } else {
      const totalItem: any = [];
      const currentProduct: any = [];
      currentProduct.push(this.productModel);
      const cart = {
        productId: product,
        pack: count,
        moq: productMoq,
        ratioQty: packSumTotal,
        size: sizeData,
        cart_product: currentProduct
      };
      totalItem.push(cart);
      totalItem.map(element => {
        if (cartLocal.find(s => s.productId === element.productId)) {
          const dbSame = cartLocal.find(s => s.productId === element.productId);
          dbSame.pack += element.pack;
        } else {
          cartLocal.push(element);
        }
      });
      this.message = 'Product Added To Cart';
      sessionStorage.setItem('cart', JSON.stringify(cartLocal));
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }
  }
  addToCartServer(userId, product, sku) {
    const totalItem: any = [];
    const cart = {
      productId: product,
      skuCode: sku,
      qty: 1
    };
    totalItem.push(cart);
    this.cartModel = new Cart();
    this.cartModel.userId = userId;
    this.cartModel.items = totalItem;
    this.productService.addToCart(this.cartModel).subscribe(data => {
    this.shopModel = data;
    sessionStorage.setItem('cartqty', this.shopModel.length);
    this.message = 'Product Added To Cart';
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  actionPlus(plus) {

  }
  actionMinus(minus) {

  }
  /* total() {
    let sum = 0;
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.totalQty();
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.set * item.moq * item.price;
      });
      return sum;
    }
  }
  totalQty() {
    let set = 0;
    const totalSet = this.shopModel.map(item => item.skuDetail);
    totalSet.map(item => {
      set += item.set;
    });
    sessionStorage.setItem('set', JSON.stringify(set));
  } */
}
