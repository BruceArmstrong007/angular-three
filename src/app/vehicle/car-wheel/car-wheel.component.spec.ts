import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWheelComponent } from './car-wheel.component';

describe('CarWheelComponent', () => {
  let component: CarWheelComponent;
  let fixture: ComponentFixture<CarWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarWheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
