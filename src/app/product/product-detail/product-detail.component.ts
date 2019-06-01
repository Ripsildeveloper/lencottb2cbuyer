import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Zoom } from '../zoommodel/zoom.model';
import { Size } from '../../shared/model/size.model';
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
  zoom: Zoom;
  zoomModel: Zoom;
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
  selectedItem: Size;
  selectedSize: boolean;
  activeTab = 'search';
  count = 1;
  updateQtyTrue = true;
  /* labelSuccess = 'labelSuccess';
  labelDanger = 'labelDanger';
  displayClass = this.labelSuccess;
  stockItemStatus = 'Available'; */
  tabItems = [{item: 'Description'}, {item: 'Points'}, {item: 'Details'}];
  selectedItemTab = this.tabItems[0].item;
  constructor(public productService: ProductService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewSingleProduct();
    this.zoom = new Zoom();
    this.zoom.displayClass = 'displayNone';
    this.zoomModel = this.zoom;
  }
  zoomClosed(emit) {
    this.zoom = new Zoom();
    this.zoom.displayClass = 'displayNone';
    this.zoom.clickIndex = emit;
    this.zoomModel = this.zoom;
  }
  clickZoom(image)   {
    this.zoom = new Zoom();
    this.zoom.displayClass = 'displayBlock';
    this.zoom.imageUrl = image;
    this.zoom.clickIndex = true;
    this.zoomModel = this.zoom;
  }
  sizeSelect(itemselect: Size) {
    this.selectedItem = itemselect;
    this.selectedItem.selectSize = itemselect.sizeName;
  }

  selectedTab(tab) {
    this.selectedItemTab = tab;
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
  selectedItems(productId, skuItem) {
    if (!this.selectedItem) {
      this.selectedSize =  true;
    } else {
      this.selectedSize =  false;
      this.skuProductAddToCart(productId, skuItem);
    }
  }
  skuProductAddToCart(productId, skuItem) {
    const userId = sessionStorage.getItem('userId');
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.addToCartServer(userId, productId, skuItem);
    } else {
      this.addToCartLocal(productId, skuItem);
    }
  }
  addToCartLocal(product, skuItem) {
    const cartLocal = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cartLocal.length === 0) {
      const totalItem: any = [];
      const currentProduct: any = [];
      currentProduct.push(this.productModel);
      const item = {
        productId: product,
        skuCode: skuItem.skuCode,
        qty: this.count
      };
      const cart = {
        items: item,
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
      const item = {
        productId: product,
        skuCode: skuItem.skuCode,
        qty: this.count
      };
      const cart = {
        items: item,
        cart_product: currentProduct
      };
      totalItem.push(cart);
      totalItem.map(element => {
        if (cartLocal.find(s => s.items.skuCode === element.items.skuCode)) {
          const localSame = cartLocal.find(s => s.items.skuCode === element.items.skuCode);
          localSame.items.qty += element.items.qty;
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
  addToCartServer(userId, product, skuItem) {
    const totalItem: any = [];
    const cart = {
      productId: product,
      skuCode: skuItem.skuCode,
      qty: this.count
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
    this.count = ++plus;
  }
  actionMinus(minus) {
    this.count = --minus;
  }

  search(activeTab) {
    this.activeTab = activeTab;
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
}
