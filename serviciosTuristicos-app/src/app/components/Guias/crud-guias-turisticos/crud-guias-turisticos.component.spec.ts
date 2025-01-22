import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGuiasTuristicosComponent } from './crud-guias-turisticos.component';

describe('CrudGuiasTuristicosComponent', () => {
  let component: CrudGuiasTuristicosComponent;
  let fixture: ComponentFixture<CrudGuiasTuristicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudGuiasTuristicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudGuiasTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
