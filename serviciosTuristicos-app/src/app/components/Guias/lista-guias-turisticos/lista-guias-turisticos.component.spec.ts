import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGuiasTuristicosComponent } from './lista-guias-turisticos.component';

describe('ListaGuiasTuristicosComponent', () => {
  let component: ListaGuiasTuristicosComponent;
  let fixture: ComponentFixture<ListaGuiasTuristicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGuiasTuristicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGuiasTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
