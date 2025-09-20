import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isObservable, Observable, of, throwError } from 'rxjs';
import { ProductsHttp } from '../../products/services/products-http';
import { productExistsGuard } from './product-exists-guard';

describe('productExistsGuard', () => {
  let mockProductsHttp: jest.Mocked<ProductsHttp>;
  let mockRouter: jest.Mocked<Router>;
  let urlTreeMock: UrlTree;

  const executeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    TestBed.runInInjectionContext(() => productExistsGuard(route, state));

  function createRouteMock(params: Record<string, string> = {}): ActivatedRouteSnapshot {
    return {
      paramMap: convertToParamMap(params),
    } as unknown as ActivatedRouteSnapshot;
  }

  function createStateMock(): RouterStateSnapshot {
    return { url: '/mock-url', root: {} as ActivatedRouteSnapshot };
  }

  beforeEach(() => {
    urlTreeMock = {} as UrlTree;

    mockProductsHttp = {
      verify: jest.fn(),
    } as unknown as jest.Mocked<ProductsHttp>;

    mockRouter = {
      createUrlTree: jest.fn().mockReturnValue(urlTreeMock),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsHttp, useValue: mockProductsHttp },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should redirect if no productId param exists', () => {
    const result = executeGuard(createRouteMock(), createStateMock());
    expect(result).toBe(urlTreeMock);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/products']);
  });

  it('should return true if the product exists', (done) => {
    mockProductsHttp.verify.mockReturnValue(of(true));
    const result = executeGuard(createRouteMock({ productId: '123' }), createStateMock());

    if (isObservable(result)) {
      (result as Observable<boolean | UrlTree>).subscribe((res) => {
        expect(res).toBe(true);
        done();
      });
    } else {
      fail('Guard should return an Observable');
    }
  });

  it('should redirect if the product does not exist', (done) => {
    mockProductsHttp.verify.mockReturnValue(of(false));
    const result = executeGuard(createRouteMock({ productId: '123' }), createStateMock());

    if (isObservable(result)) {
      (result as Observable<boolean | UrlTree>).subscribe((res) => {
        expect(res).toBe(urlTreeMock);
        expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/products']);
        done();
      });
    } else {
      fail('Guard should return an Observable');
    }
  });

  it('should redirect if the service throws an error', (done) => {
    mockProductsHttp.verify.mockReturnValue(throwError(() => new Error('fail')));
    const result = executeGuard(createRouteMock({ productId: '123' }), createStateMock());

    if (isObservable(result)) {
      (result as Observable<boolean | UrlTree>).subscribe((res) => {
        expect(res).toBe(urlTreeMock);
        expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/products']);
        done();
      });
    } else {
      fail('Guard should return an Observable');
    }
  });
});
