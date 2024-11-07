import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedReviewsComponent } from './featured-reviews.component';

describe('FeaturedReviewsComponent', () => {
  let component: FeaturedReviewsComponent;
  let fixture: ComponentFixture<FeaturedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
