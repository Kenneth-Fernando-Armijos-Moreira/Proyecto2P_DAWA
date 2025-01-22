import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudExcursionesComponent } from './crud-excursiones.component';

describe('CrudExcursionesComponent', () => {
  let component: CrudExcursionesComponent;
  let fixture: ComponentFixture<CrudExcursionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudExcursionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudExcursionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
