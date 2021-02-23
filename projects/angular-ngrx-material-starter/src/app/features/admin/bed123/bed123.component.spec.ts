import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed123Component } from './bed123.component';

describe('Bed123Component', () => {
  let component: Bed123Component;
  let fixture: ComponentFixture<Bed123Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bed123Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed123Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
