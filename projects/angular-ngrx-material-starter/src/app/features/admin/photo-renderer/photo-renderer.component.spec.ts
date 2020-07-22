import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoRendererComponent } from './photo-renderer.component';

describe('PhotoRendererComponent', () => {
  let component: PhotoRendererComponent;
  let fixture: ComponentFixture<PhotoRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoRendererComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
