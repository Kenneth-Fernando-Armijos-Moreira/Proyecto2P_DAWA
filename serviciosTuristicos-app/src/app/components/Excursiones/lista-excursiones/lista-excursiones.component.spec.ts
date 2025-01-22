import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExcursionesComponent } from './lista-excursiones.component';

describe('ListaExcursionesComponent', () => {
  let component: ListaExcursionesComponent;
  let fixture: ComponentFixture<ListaExcursionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaExcursionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaExcursionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
