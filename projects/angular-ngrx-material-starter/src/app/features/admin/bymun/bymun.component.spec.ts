import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BymunComponent } from './bymun.component';

describe('BymunComponent', () => {
  let component: BymunComponent;
  let fixture: ComponentFixture<BymunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BymunComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BymunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
