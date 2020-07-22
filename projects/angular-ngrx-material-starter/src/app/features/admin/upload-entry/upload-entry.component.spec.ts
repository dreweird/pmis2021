import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEntryComponent } from './upload-entry.component';

describe('UploadEntryComponent', () => {
  let component: UploadEntryComponent;
  let fixture: ComponentFixture<UploadEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadEntryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
