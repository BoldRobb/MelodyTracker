import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumResultsComponent } from './album-results.component';

describe('AlbumResultsComponent', () => {
  let component: AlbumResultsComponent;
  let fixture: ComponentFixture<AlbumResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
