import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudActividadesRecreativasComponent } from './crud-actividades-recreativas.component';

describe('CrudActividadesRecreativasComponent', () => {
  let component: CrudActividadesRecreativasComponent;
  let fixture: ComponentFixture<CrudActividadesRecreativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudActividadesRecreativasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudActividadesRecreativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
