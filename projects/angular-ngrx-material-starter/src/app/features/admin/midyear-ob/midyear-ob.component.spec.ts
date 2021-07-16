import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidyearObComponent } from './midyear-ob.component';

describe('MidyearObComponent', () => {
  let component: MidyearObComponent;
  let fixture: ComponentFixture<MidyearObComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidyearObComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidyearObComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
