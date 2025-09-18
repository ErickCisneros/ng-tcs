import { TestBed } from '@angular/core/testing';
import { ProductsHttp } from './products-http';

describe('ProductsHttp', () => {
  let service: ProductsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
