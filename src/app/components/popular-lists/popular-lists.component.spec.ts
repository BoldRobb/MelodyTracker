import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularListsComponent } from './popular-lists.component';

describe('PopularListsComponent', () => {
  let component: PopularListsComponent;
  let fixture: ComponentFixture<PopularListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
