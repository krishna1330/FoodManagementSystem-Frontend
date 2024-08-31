import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAvailabilityComponent } from './food-availability.component';

describe('FoodAvailabilityComponent', () => {
  let component: FoodAvailabilityComponent;
  let fixture: ComponentFixture<FoodAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
