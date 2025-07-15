import { TestBed } from '@angular/core/testing';

import { ProductResolve1Service } from './product-resolve1.service';

describe('ProductResolve1Service', () => {
  let service: ProductResolve1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolve1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
