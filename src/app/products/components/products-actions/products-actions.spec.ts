import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsActions } from './products-actions';

describe('ProductsActions', () => {
  let component: ProductsActions;
  let fixture: ComponentFixture<ProductsActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsActions],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
