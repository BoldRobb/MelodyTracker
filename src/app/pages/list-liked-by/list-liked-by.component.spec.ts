import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLikedByComponent } from './list-liked-by.component';

describe('ListLikedByComponent', () => {
  let component: ListLikedByComponent;
  let fixture: ComponentFixture<ListLikedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLikedByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLikedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
