import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenLikeWatchComponent } from './listen-like-watch.component';

describe('ListenLikeWatchComponent', () => {
  let component: ListenLikeWatchComponent;
  let fixture: ComponentFixture<ListenLikeWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenLikeWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenLikeWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
