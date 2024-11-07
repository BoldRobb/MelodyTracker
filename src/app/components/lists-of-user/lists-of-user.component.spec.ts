import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsOfUserComponent } from './lists-of-user.component';

describe('ListsOfUserComponent', () => {
  let component: ListsOfUserComponent;
  let fixture: ComponentFixture<ListsOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsOfUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
