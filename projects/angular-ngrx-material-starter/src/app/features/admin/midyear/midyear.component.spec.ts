import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidyearComponent } from './midyear.component';

describe('MidyearComponent', () => {
  let component: MidyearComponent;
  let fixture: ComponentFixture<MidyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
