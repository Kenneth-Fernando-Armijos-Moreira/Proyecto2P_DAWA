import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaCrudComponent } from './tabla-crud.component';

describe('TablaCrudComponent', () => {
  let component: TablaCrudComponent;
  let fixture: ComponentFixture<TablaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
