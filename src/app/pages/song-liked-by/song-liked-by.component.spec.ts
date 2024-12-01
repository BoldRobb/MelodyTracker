import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLikedByComponent } from './song-liked-by.component';

describe('SongLikedByComponent', () => {
  let component: SongLikedByComponent;
  let fixture: ComponentFixture<SongLikedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongLikedByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongLikedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
