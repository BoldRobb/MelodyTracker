import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestUsersComponent } from './best-users.component';

describe('BestUsersComponent', () => {
  let component: BestUsersComponent;
  let fixture: ComponentFixture<BestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
