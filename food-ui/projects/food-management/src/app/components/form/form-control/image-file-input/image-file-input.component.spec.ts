import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFileInputComponent } from './image-file-input.component';

describe('ImageFileInputComponent', () => {
  let component: ImageFileInputComponent;
  let fixture: ComponentFixture<ImageFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
