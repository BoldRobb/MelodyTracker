import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumLikedByComponent } from './album-liked-by.component';

describe('AlbumLikedByComponent', () => {
  let component: AlbumLikedByComponent;
  let fixture: ComponentFixture<AlbumLikedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumLikedByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumLikedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
