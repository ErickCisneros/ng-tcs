import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { ProductsHttp } from '../../products/services/products-http';

export function uniqueIdValidator(productsHttp: ProductsHttp): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return timer(500).pipe(
      switchMap(() => productsHttp.verify(control.value)),
      map((exists: boolean) => (exists ? { idExists: true } : null)),
      catchError(() => of(null)),
    );
  };
}
