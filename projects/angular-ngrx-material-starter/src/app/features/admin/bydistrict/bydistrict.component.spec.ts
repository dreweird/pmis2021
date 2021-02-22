import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BydistrictComponent } from './bydistrict.component';

describe('BydistrictComponent', () => {
  let component: BydistrictComponent;
  let fixture: ComponentFixture<BydistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BydistrictComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BydistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
