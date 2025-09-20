import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProductModel } from '../../core/models/product.model';
import { HttpResponse } from '../../shared/types/http-response';
import { ProductsHttp } from './products-http';

describe('ProductsHttp', () => {
  let service: ProductsHttp;
  let httpClient: jest.Mocked<HttpClient>;

  const mockProduct: ProductModel = {
    id: 'p1',
    name: 'Product 1',
    description: 'Description 1',
    logo: 'logo.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01',
  };

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [ProductsHttp, { provide: HttpClient, useValue: httpClient }],
    });

    service = TestBed.inject(ProductsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should call GET and map response data', (done) => {
    const mockResponse: HttpResponse<ProductModel[]> = { data: [mockProduct] };
    httpClient.get.mockReturnValue(of(mockResponse));

    service.getAll().subscribe((res) => {
      expect(res).toEqual([mockProduct]);
      expect(httpClient.get).toHaveBeenCalledWith(environment.API_PRODUCTS);
      done();
    });
  });

  it('get should call GET with id', (done) => {
    httpClient.get.mockReturnValue(of(mockProduct));

    service.get('p1').subscribe((res) => {
      expect(res).toEqual(mockProduct);
      expect(httpClient.get).toHaveBeenCalledWith(`${environment.API_PRODUCTS}/p1`);
      done();
    });
  });

  it('verify should call GET with verification url', (done) => {
    httpClient.get.mockReturnValue(of(true));

    service.verify('p1').subscribe((res) => {
      expect(res).toBe(true);
      expect(httpClient.get).toHaveBeenCalledWith(`${environment.API_PRODUCTS}/verification/p1`);
      done();
    });
  });

  it('create should call POST with product', (done) => {
    const mockResponse = { message: 'created', data: mockProduct };
    httpClient.post.mockReturnValue(of(mockResponse));

    service.create(mockProduct).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClient.post).toHaveBeenCalledWith(environment.API_PRODUCTS, mockProduct);
      done();
    });
  });

  it('update should call PUT with id and product', (done) => {
    const mockResponse = { message: 'updated', data: mockProduct };
    httpClient.put.mockReturnValue(of(mockResponse));

    service.update('p1', mockProduct).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClient.put).toHaveBeenCalledWith(`${environment.API_PRODUCTS}/p1`, mockProduct);
      done();
    });
  });

  it('delete should call DELETE with id', (done) => {
    const mockResponse = { message: 'deleted' };
    httpClient.delete.mockReturnValue(of(mockResponse));

    service.delete('p1').subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClient.delete).toHaveBeenCalledWith(`${environment.API_PRODUCTS}/p1`);
      done();
    });
  });
});
