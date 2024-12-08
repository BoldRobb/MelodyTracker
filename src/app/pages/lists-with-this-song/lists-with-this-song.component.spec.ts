import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsWithThisSongComponent } from './lists-with-this-song.component';

describe('ListsWithThisSongComponent', () => {
  let component: ListsWithThisSongComponent;
  let fixture: ComponentFixture<ListsWithThisSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsWithThisSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsWithThisSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
