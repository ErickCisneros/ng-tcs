import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductMessages } from '../../../core/enums';
import { ProductModel } from '../../../core/models/product.model';
import { Snackbar } from '../../../shared/services/snackbar';
import { ProductsHttp } from '../../services/products-http';
import Product from './product';

class MockProductsHttp {
  get = jest.fn(() => of());
}

class MockSnackbar {
  show = jest.fn<void, [string]>();
}

const mockProduct: ProductModel = {
  id: 'prd-001',
  name: 'Test Product',
  description: 'Some description',
  logo: 'http://logo.png',
  date_release: '2025-01-01',
  date_revision: '2026-01-01',
};

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;
  let productsHttp: MockProductsHttp;
  let snackbar: MockSnackbar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [
        { provide: ProductsHttp, useClass: MockProductsHttp },
        { provide: Snackbar, useClass: MockSnackbar },
        provideHttpClient(),
        provideRouter([]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    productsHttp = TestBed.inject(ProductsHttp) as unknown as MockProductsHttp;
    snackbar = TestBed.inject(Snackbar) as unknown as MockSnackbar;
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

  it('should patch form and disable id control when product loads successfully', () => {
    (productsHttp.get as jest.Mock).mockReturnValue(of(mockProduct));

    fixture.componentRef.setInput('productId', 'prd-001');
    fixture.detectChanges();

    expect(productsHttp.get).toHaveBeenCalledWith('prd-001');
    expect(component.form.value.name).toBe(mockProduct.name);
    expect(component.form.get('id')?.disabled).toBe(true);
  });

  it('should call snackbar.show with LOAD_ERROR when service fails', () => {
    (productsHttp.get as jest.Mock).mockReturnValue(throwError(() => new Error('fail')));

    fixture.componentRef.setInput('productId', 'prd-001');
    fixture.detectChanges();

    expect(snackbar.show).toHaveBeenCalledWith(ProductMessages.LOAD_ERROR);
  });

  it('should set date_revision to one year after date_release when a value is provided', () => {
    fixture.componentRef.setInput('productId', 'create-product');
    fixture.detectChanges();

    component.form.controls.date_release.setValue('2025-01-01');
    const revisionValue = component.form.controls.date_revision.value;

    fixture.detectChanges();
    expect(revisionValue).toBe('2026-01-01');
  });

  it('should not update date_revision when date_release is null', () => {
    fixture.componentRef.setInput('productId', 'prd-001');
    component.form.controls.date_revision.setValue('2029-01-01');
    component.form.controls.date_release.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.date_revision.value).toBe('2029-01-01');
  });

  it('should reset form but keep id when in edit mode', () => {
    component.isEdit.set(true);
    component.form.patchValue(mockProduct);

    component.onReset();

    expect(component.form.controls.id.value).toBe(mockProduct.id);
    expect(component.form.controls.name.value).toBe('');
  });

  it('should reset form completely when in create mode', () => {
    component.isEdit.set(false);
    component.form.patchValue(mockProduct);

    component.onReset();

    expect(component.form.controls.id.value).toBe('');
    expect(component.form.controls.name.value).toBe('');
  });
});
