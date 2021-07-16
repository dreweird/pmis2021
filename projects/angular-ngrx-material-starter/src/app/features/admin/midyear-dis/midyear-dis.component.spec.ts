import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidyearDisComponent } from './midyear-dis.component';

describe('MidyearDisComponent', () => {
  let component: MidyearDisComponent;
  let fixture: ComponentFixture<MidyearDisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidyearDisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidyearDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
