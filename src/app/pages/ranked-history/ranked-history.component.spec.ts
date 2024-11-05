import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedHistoryComponent } from './ranked-history.component';

describe('RankedHistoryComponent', () => {
  let component: RankedHistoryComponent;
  let fixture: ComponentFixture<RankedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankedHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
