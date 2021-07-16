import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidyearAllComponent } from './midyear-all.component';

describe('MidyearAllComponent', () => {
  let component: MidyearAllComponent;
  let fixture: ComponentFixture<MidyearAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidyearAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidyearAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
