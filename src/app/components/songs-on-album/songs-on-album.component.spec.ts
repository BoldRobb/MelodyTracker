import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsOnAlbumComponent } from './songs-on-album.component';

describe('SongsOnAlbumComponent', () => {
  let component: SongsOnAlbumComponent;
  let fixture: ComponentFixture<SongsOnAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsOnAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsOnAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
