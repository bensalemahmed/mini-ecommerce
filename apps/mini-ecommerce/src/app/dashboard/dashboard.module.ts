import { NgModule } from '@angular/core';
import { ListProductsComponent } from './modules/list-products/list-products.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedComponentModule } from '@mini-ecommerce/shared-component';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
/**
 * The DashboardModule is responsible for managing the dashboard feature of the application.
 */
@NgModule({
  declarations: [DashboardComponent, ListProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    RouterModule,
    FormsModule,
    SharedComponentModule,
    DialogModule,
    DynamicDialogModule,
  ],
  providers: [DialogService],
})
export class DashboardModule {}
