import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProductModel } from '../../core/models/product.model';
import { HttpResponse } from '../../shared/types/http-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttp {
  private http = inject(HttpClient);
  private readonly API_PRODUCTS = environment.API_PRODUCTS;

  getAll() {
    return this.http
      .get<HttpResponse<ProductModel[]>>(this.API_PRODUCTS)
      .pipe(map((res) => res.data));
  }

  get(id: string) {
    return this.http.get<ProductModel>(`${this.API_PRODUCTS}/${id}`);
  }

  verify(id: string) {
    return this.http.get<boolean>(`${this.API_PRODUCTS}/verification/${id}`);
  }

  create(product: ProductModel) {
    return this.http.post<{ message: string; data: ProductModel }>(this.API_PRODUCTS, product);
  }

  update(id: string, product: ProductModel) {
    return this.http.put<{ message: string; data: ProductModel }>(
      `${this.API_PRODUCTS}/${id}`,
      product,
    );
  }

  delete(id: string) {
    return this.http.delete<{ message: string }>(`${this.API_PRODUCTS}/${id}`);
  }
}
