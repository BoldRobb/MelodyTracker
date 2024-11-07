import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddToListComponent } from './btn-add-to-list.component';

describe('BtnAddToListComponent', () => {
  let component: BtnAddToListComponent;
  let fixture: ComponentFixture<BtnAddToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnAddToListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
