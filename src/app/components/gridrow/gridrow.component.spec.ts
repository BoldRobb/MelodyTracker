import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridrowComponent } from './gridrow.component';

describe('GridrowComponent', () => {
  let component: GridrowComponent;
  let fixture: ComponentFixture<GridrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
