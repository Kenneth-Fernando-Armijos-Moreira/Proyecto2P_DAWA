import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAlojamientosComponent } from './crud-alojamientos.component';

describe('CrudAlojamientosComponent', () => {
  let component: CrudAlojamientosComponent;
  let fixture: ComponentFixture<CrudAlojamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAlojamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
