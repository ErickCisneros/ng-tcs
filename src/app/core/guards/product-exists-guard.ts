import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ProductsHttp } from '../../products/services/products-http';

export const productExistsGuard: CanActivateFn = (route) => {
  const productsHttp = inject(ProductsHttp);
  const router = inject(Router);

  const productId = route.paramMap.get('productId');
  if (!productId) {
    return router.createUrlTree(['/products']);
  }

  return productsHttp.verify(productId).pipe(
    map((exists) => {
      if (exists) {
        return true;
      }
      return router.createUrlTree(['/products']);
    }),
    catchError(() => of(router.createUrlTree(['/products']))),
  );
};
