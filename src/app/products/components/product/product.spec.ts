import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import Product from './product';

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [provideHttpClient(), provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
  });

  it('should create component when is create product', () => {
    fixture.componentRef.setInput('productId', 'create-product');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create component when is edit product', () => {
    fixture.componentRef.setInput('productId', 'prd-001');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
