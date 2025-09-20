import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductModel } from '../core/models/product.model';
import Products from './products';

const mockProducts: ProductModel[] = [
  {
    id: 'prd-001',
    name: 'Laptop',
    description: 'Powerful laptop',
    logo: 'http://logo1.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01',
  },
  {
    id: 'prd-002',
    name: 'Phone',
    description: 'Smartphone device',
    logo: 'http://logo2.png',
    date_release: '2025-02-01',
    date_revision: '2026-02-01',
  },
];

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [provideHttpClient(), provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by name', () => {
    component['allProducts'].set(mockProducts);
    component.products.set(mockProducts);
    component.onSearch('laptop');

    fixture.detectChanges();

    expect(component.products()).toEqual([expect.objectContaining({ id: 'prd-001' })]);
  });
});
