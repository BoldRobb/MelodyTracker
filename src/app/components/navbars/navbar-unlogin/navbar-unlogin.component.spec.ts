import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUnloginComponent } from './navbar-unlogin.component';

describe('NavbarUnloginComponent', () => {
  let component: NavbarUnloginComponent;
  let fixture: ComponentFixture<NavbarUnloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUnloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUnloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
