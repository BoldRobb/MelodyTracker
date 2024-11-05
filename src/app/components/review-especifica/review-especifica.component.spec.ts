import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEspecificaComponent } from './review-especifica.component';

describe('ReviewEspecificaComponent', () => {
  let component: ReviewEspecificaComponent;
  let fixture: ComponentFixture<ReviewEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewEspecificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
