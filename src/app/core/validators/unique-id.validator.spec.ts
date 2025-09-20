import { FormControl } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { ProductsHttp } from '../../products/services/products-http';
import { uniqueIdValidator } from './unique-id.validator';

describe('uniqueIdValidator', () => {
  let mockProductsHttp: jest.Mocked<ProductsHttp>;

  beforeEach(() => {
    jest.useFakeTimers();
    mockProductsHttp = {
      verify: jest.fn(),
    } as unknown as jest.Mocked<ProductsHttp>;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return null when control value is empty', (done) => {
    const validator = uniqueIdValidator(mockProductsHttp);
    const control = new FormControl('');

    const result = validator(control) as Observable<unknown>;

    result.subscribe((res) => {
      expect(res).toBeNull();
      done();
    });
  });

  it('should return { idExists: true } when id already exists', (done) => {
    mockProductsHttp.verify.mockReturnValue(of(true));
    const validator = uniqueIdValidator(mockProductsHttp);
    const control = new FormControl('ABC');

    const result = validator(control) as Observable<unknown>;

    result.subscribe((res) => {
      expect(res).toEqual({ idExists: true });
      done();
    });

    jest.advanceTimersByTime(500);
  });

  it('should return null when id does not exist', (done) => {
    mockProductsHttp.verify.mockReturnValue(of(false));
    const validator = uniqueIdValidator(mockProductsHttp);
    const control = new FormControl('XYZ');

    const result = validator(control) as Observable<unknown>;

    result.subscribe((res) => {
      expect(res).toBeNull();
      done();
    });

    jest.advanceTimersByTime(500);
  });

  it('should return null when service throws an error', (done) => {
    mockProductsHttp.verify.mockReturnValue(throwError(() => new Error('Service error')));
    const validator = uniqueIdValidator(mockProductsHttp);
    const control = new FormControl('ERR');

    const result = validator(control) as Observable<unknown>;

    result.subscribe((res) => {
      expect(res).toBeNull();
      done();
    });

    jest.advanceTimersByTime(500);
  });
});
