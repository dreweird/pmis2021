import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementComponent } from './disbursement.component';

describe('DisbursementComponent', () => {
  let component: DisbursementComponent;
  let fixture: ComponentFixture<DisbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisbursementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
