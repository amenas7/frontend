import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorUnoComponent } from './indicador-uno.component';

describe('IndicadorUnoComponent', () => {
  let component: IndicadorUnoComponent;
  let fixture: ComponentFixture<IndicadorUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
