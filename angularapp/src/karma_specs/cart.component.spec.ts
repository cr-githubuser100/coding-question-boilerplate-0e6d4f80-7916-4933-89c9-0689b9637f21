import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from '../src/app/cart/cart.component';
import { CartService } from '../src/app/services/cart.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockCartItems = [
    { id: 1, name: 'Item 1', price: 10.99, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20.99, quantity: 1 }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', ['getCart', 'updateQuantity', 'removeItem']);
    spy.getCart.and.returnValue(of(mockCartItems));
    spy.updateQuantity.and.returnValue(of({}));
    spy.removeItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: spy }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on init', () => {
    expect(cartService.getCart).toHaveBeenCalled();
    expect(component.cartItems).toEqual(mockCartItems);
  });

  it('should update item quantity', () => {
    component.updateQuantity(1, 3);
    expect(cartService.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should remove item from cart', () => {
    component.removeItem(1);
    expect(cartService.removeItem).toHaveBeenCalledWith(1);
  });

  it('should calculate total price correctly', () => {
    const total = component.calculateTotal();
    expect(total).toBe(42.97);
  });
});
