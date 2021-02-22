import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdzComponent } from './pdz.component';

describe('PdzComponent', () => {
  let component: PdzComponent;
  let fixture: ComponentFixture<PdzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdzComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
