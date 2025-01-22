import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogoExito } from './dialogo-exito.component';

describe('DialogoExito', () => {
  let component: DialogoExito;
  let fixture: ComponentFixture<DialogoExito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoExito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoExito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
