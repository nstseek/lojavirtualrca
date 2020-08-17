import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoComponent } from './carrinho.component';
import { AppModule } from 'src/app/app.module';

describe('CarrinhoComponent', () => {
  let component: CarrinhoComponent;
  let fixture: ComponentFixture<CarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
