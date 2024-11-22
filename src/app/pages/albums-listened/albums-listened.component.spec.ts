import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsListenedComponent } from './albums-listened.component';

describe('AlbumsListenedComponent', () => {
  let component: AlbumsListenedComponent;
  let fixture: ComponentFixture<AlbumsListenedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsListenedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsListenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
