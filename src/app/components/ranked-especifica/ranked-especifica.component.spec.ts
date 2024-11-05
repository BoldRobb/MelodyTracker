import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedEspecificaComponent } from './ranked-especifica.component';

describe('RankedEspecificaComponent', () => {
  let component: RankedEspecificaComponent;
  let fixture: ComponentFixture<RankedEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankedEspecificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankedEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
