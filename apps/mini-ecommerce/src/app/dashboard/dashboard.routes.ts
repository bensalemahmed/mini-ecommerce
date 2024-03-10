import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListProductsComponent } from './modules/list-products/list-products.component';

/**
 * Represents the routes for the dashboard module.
 */
export const dashboardRoutes: Route[] = [
  {
    /**
     * The path for the dashboard component.
     */
    path: '',
    /**
     * The component to be rendered for the dashboard route.
     */
    component: DashboardComponent,
    children: [
      {
        /**
         * The path for the list products component.
         */
        path: '',
        /**
         * The component to be rendered for the list products route.
         */
        component: ListProductsComponent,
      },
    ],
  },
];
