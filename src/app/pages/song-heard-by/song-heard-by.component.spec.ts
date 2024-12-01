import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongHeardByComponent } from './song-heard-by.component';

describe('SongHeardByComponent', () => {
  let component: SongHeardByComponent;
  let fixture: ComponentFixture<SongHeardByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongHeardByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongHeardByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
