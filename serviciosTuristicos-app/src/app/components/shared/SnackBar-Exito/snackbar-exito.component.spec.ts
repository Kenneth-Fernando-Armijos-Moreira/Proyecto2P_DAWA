import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackBarExito } from './snackbar-exito.component';

describe('SnackBarExito', () => {
  let component: SnackBarExito;
  let fixture: ComponentFixture<SnackBarExito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarExito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarExito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
