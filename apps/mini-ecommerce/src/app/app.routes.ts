import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * The routes configuration for the application.
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentification/authentification.module').then(
        (m) => m.AuthentificationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
