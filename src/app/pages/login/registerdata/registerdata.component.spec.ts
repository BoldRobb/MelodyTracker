import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdataComponent } from './registerdata.component';

describe('RegisterdataComponent', () => {
  let component: RegisterdataComponent;
  let fixture: ComponentFixture<RegisterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
