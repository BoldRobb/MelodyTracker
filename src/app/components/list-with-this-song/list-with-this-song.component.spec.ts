import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWithThisSongComponent } from './list-with-this-song.component';

describe('ListWithThisSongComponent', () => {
  let component: ListWithThisSongComponent;
  let fixture: ComponentFixture<ListWithThisSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWithThisSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWithThisSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
