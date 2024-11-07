import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourRatingComponent } from './your-rating.component';

describe('YourRatingComponent', () => {
  let component: YourRatingComponent;
  let fixture: ComponentFixture<YourRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
