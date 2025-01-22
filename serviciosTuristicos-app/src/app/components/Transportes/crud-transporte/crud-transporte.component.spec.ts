import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTransporteComponent } from './crud-transporte.component';

describe('CrudTransporteComponent', () => {
  let component: CrudTransporteComponent;
  let fixture: ComponentFixture<CrudTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
