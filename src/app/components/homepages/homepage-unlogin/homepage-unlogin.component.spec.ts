import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUnloginComponent } from './homepage-unlogin.component';

describe('HomepageUnloginComponent', () => {
  let component: HomepageUnloginComponent;
  let fixture: ComponentFixture<HomepageUnloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageUnloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageUnloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
