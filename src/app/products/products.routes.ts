import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products'),
  },
  {
    path: 'new-product',
    loadComponent: () => import('./components/product/product'),
  },
  {
    path: ':productId',
    loadComponent: () => import('./components/product/product'),
  },
];

export default routes;
