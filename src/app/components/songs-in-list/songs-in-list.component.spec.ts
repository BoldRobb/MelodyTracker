import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsInListComponent } from './songs-in-list.component';

describe('SongsInListComponent', () => {
  let component: SongsInListComponent;
  let fixture: ComponentFixture<SongsInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsInListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
