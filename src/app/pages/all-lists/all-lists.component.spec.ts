import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListsComponent } from './all-lists.component';

describe('AllListsComponent', () => {
  let component: AllListsComponent;
  let fixture: ComponentFixture<AllListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
