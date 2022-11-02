import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBodyComponent } from './car-body.component';

describe('CarBodyComponent', () => {
  let component: CarBodyComponent;
  let fixture: ComponentFixture<CarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
