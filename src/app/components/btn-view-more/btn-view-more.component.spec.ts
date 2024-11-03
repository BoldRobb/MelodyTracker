import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnViewMoreComponent } from './btn-view-more.component';

describe('BtnViewMoreComponent', () => {
  let component: BtnViewMoreComponent;
  let fixture: ComponentFixture<BtnViewMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnViewMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
