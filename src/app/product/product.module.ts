import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductsComponent } from './view-products/view-products.component';
import {ProductRoutingModule} from './product-routing.module';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTabsModule,
  MatSliderModule
} from '@angular/material';
import { ViewSingleProductComponent } from './view-single-product/view-single-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailViewComponent } from './product-detail-view/product-detail-view.component';
import { ProductDetailComponent} from './product-detail/product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import { PriceSummaryComponent } from './price-summary/price-summary.component';

@NgModule({
  declarations: [ViewProductsComponent, ViewSingleProductComponent,
    ProductListComponent, ProductDetailViewComponent,
     ProductDetailComponent, ShoppingCartComponent, PriceSummaryComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatSliderModule
  ]
})
export class ProductModule { }
