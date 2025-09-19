import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { productExistsGuard } from './product-exists-guard';

describe('productExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => productExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
