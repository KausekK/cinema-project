import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDetailsComponent } from './move-details.component';

describe('MoveDetailsComponent', () => {
  let component: MoveDetailsComponent;
  let fixture: ComponentFixture<MoveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
