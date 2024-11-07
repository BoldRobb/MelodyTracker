import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReviewComponent } from './btn-review.component';

describe('BtnReviewComponent', () => {
  let component: BtnReviewComponent;
  let fixture: ComponentFixture<BtnReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
