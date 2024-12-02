import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from '../src/app/catalog/catalog.component';
import { CatalogService } from '../src/app/services/catalog.service';
import { of } from 'rxjs';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let catalogService: jasmine.SpyObj<CatalogService>;

  const mockProducts = [
    { id: 1, name: 'Product 1', price: 10.99, image: 'img1.jpg' },
    { id: 2, name: 'Product 2', price: 20.99, image: 'img2.jpg' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CatalogService', ['getProducts']);
    spy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [ CatalogComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CatalogService, useValue: spy }
      ]
    }).compileComponents();

    catalogService = TestBed.inject(CatalogService) as jasmine.SpyObj<CatalogService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(catalogService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('should filter products by name', fakeAsync(() => {
    component.searchTerm = 'Product 1';
    component.filterProducts();
    tick(300);
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  }));
});
