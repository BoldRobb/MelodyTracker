import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDatosUserComponent } from './profile-datos-user.component';

describe('ProfileDatosUserComponent', () => {
  let component: ProfileDatosUserComponent;
  let fixture: ComponentFixture<ProfileDatosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDatosUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDatosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
