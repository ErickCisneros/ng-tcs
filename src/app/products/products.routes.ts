import { Routes } from '@angular/router';
import { productExistsGuard } from '../core/guards/product-exists-guard';

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
    canActivate: [productExistsGuard],
    loadComponent: () => import('./components/product/product'),
  },
];

export default routes;
