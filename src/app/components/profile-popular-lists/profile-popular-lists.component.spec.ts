import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePopularListsComponent } from './profile-popular-lists.component';

describe('ProfilePopularListsComponent', () => {
  let component: ProfilePopularListsComponent;
  let fixture: ComponentFixture<ProfilePopularListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePopularListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePopularListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
