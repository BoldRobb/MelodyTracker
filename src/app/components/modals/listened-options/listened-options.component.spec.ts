import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenedOptionsComponent } from './listened-options.component';

describe('ListenedOptionsComponent', () => {
  let component: ListenedOptionsComponent;
  let fixture: ComponentFixture<ListenedOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenedOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
