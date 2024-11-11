import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSongAlbumComponent } from './datos-song-album.component';

describe('DatosSongAlbumComponent', () => {
  let component: DatosSongAlbumComponent;
  let fixture: ComponentFixture<DatosSongAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosSongAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosSongAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
