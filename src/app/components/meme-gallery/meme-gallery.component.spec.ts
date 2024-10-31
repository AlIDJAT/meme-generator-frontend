import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeGalleryComponent } from './meme-gallery.component';

describe('MemeGalleryComponent', () => {
  let component: MemeGalleryComponent;
  let fixture: ComponentFixture<MemeGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
