import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBioStatsComponent } from './profile-bio-stats.component';

describe('ProfileBioStatsComponent', () => {
  let component: ProfileBioStatsComponent;
  let fixture: ComponentFixture<ProfileBioStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBioStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBioStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
