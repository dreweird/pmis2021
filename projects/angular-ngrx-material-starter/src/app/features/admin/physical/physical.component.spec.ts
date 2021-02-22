import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalComponent } from './physical.component';

describe('PhysicalComponent', () => {
  let component: PhysicalComponent;
  let fixture: ComponentFixture<PhysicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
