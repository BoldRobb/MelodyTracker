import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumHeardByComponent } from './album-heard-by.component';

describe('AlbumHeardByComponent', () => {
  let component: AlbumHeardByComponent;
  let fixture: ComponentFixture<AlbumHeardByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumHeardByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumHeardByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
