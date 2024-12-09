import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlbumsComponent } from './new-albums.component';

describe('NewAlbumsComponent', () => {
  let component: NewAlbumsComponent;
  let fixture: ComponentFixture<NewAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
