import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentsOnReviewComponent } from './coments-on-review.component';

describe('ComentsOnReviewComponent', () => {
  let component: ComentsOnReviewComponent;
  let fixture: ComponentFixture<ComentsOnReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentsOnReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentsOnReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
