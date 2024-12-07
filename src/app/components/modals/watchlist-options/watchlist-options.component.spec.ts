import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistOptionsComponent } from './watchlist-options.component';

describe('WatchlistOptionsComponent', () => {
  let component: WatchlistOptionsComponent;
  let fixture: ComponentFixture<WatchlistOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
