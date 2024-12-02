import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from '../src/app/services/cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart items', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', quantity: 2 }
    ];

    service.getCart().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne('/cart');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should update item quantity', () => {
    service.updateQuantity(1, 3).subscribe();

    const req = httpMock.expectOne('/cart/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ quantity: 3 });
  });

  it('should remove item from cart', () => {
    service.removeItem(1).subscribe();

    const req = httpMock.expectOne('/cart/1');
    expect(req.request.method).toBe('DELETE');
  });
});
