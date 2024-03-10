import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatExpPipe } from './format-exp.pipe';
import { SharedUiModule } from '@mini-ecommerce/shared-ui';
/**
 * The shared component module.
 * This module contains shared components, modules, and pipes used throughout the application.
 */
@NgModule({
  imports: [
    CommonModule,
    StepsModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
  ],
  declarations: [
    SideBarComponent,
    NavBarComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    FormatExpPipe,
  ],
  exports: [
    SideBarComponent,
    NavBarComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    StepsModule,
    TableModule,
    FormatExpPipe,
    ReactiveFormsModule,
  ],
})
export class SharedComponentModule {}
