import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongResultsComponent } from './song-results.component';

describe('SongResultsComponent', () => {
  let component: SongResultsComponent;
  let fixture: ComponentFixture<SongResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
