import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { select, Store } from '@ngrx/store';
import { IFoodAvaialability } from '../../models/food-availability.model';
import { clearFoodAvailability, getFoodAvailabilityData } from '../../store/food-availability/food-availability.action';
import { getFoodAvailabilityData as selectFoodAvailabilityData } from '../../store/food-availability/food-availability.selector';
import { ToastrService } from 'ngx-toastr';
import { IFoodCalendar, IFoodCount, IUserSelectedFood } from '../../models/user-selected-food.model';
import { addUserSelectedFood, clearUserSelectedFood, getUserSelectedFood } from '../../store/user-selected-food/user-selected-food.action';
import { AuthService } from '../../services/auth.service';
import { getUserSelectedFoodData } from '../../store/user-selected-food/user-selected-food.selector';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { authInterceptor } from '../../interceptors/auth.interceptor';
import { FoodService } from '../../services/food.service';
import { response } from 'express';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true,
    },
  ],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @ViewChild('exampleModalCenter', { static: true }) modal!: ElementRef;

  private store = inject(Store);
  foodAvailability: IFoodAvaialability[] = [];
  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  foodService = inject(FoodService);

  selectedDate_fc: string = new Date().toISOString().split('T')[0];
  foodCount: IFoodCount = {
    selectedDate: new Date(),
    food_Count: {}
  };

  months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 }
  ];

  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentMonth: number = new Date().getMonth();
  selectedMonth: number = this.currentMonth;
  calendar: number[][] = [];
  foodCalendar: IFoodCalendar[][] = [];
  selectedDate: string = '';
  selectedFood: string = '';
  foodOptions: { name: string, value: string }[] = [];
  userSelectedFood: IUserSelectedFood[] = [];
  userID !: Number;

  ngOnInit() {
    this.store.dispatch(getFoodAvailabilityData({ month: Number(this.selectedMonth) + 1 }));
    this.store.pipe(select(selectFoodAvailabilityData)).subscribe((data) => {
      this.foodAvailability = data;
    });

    const userID = Number(this.authService.getAuthDetails().userID);
    this.store.dispatch(getUserSelectedFood({ userID: userID, month: this.selectedMonth + 1 }));
    this.store.pipe(select(getUserSelectedFoodData)).subscribe((data) => {
      this.userSelectedFood = data;
      this.generateCalendar(this.selectedMonth);
    });

    this.fetchFoodCount();
  }

  onMonthChange() {
    this.store.dispatch(clearUserSelectedFood());
    this.store.dispatch(clearFoodAvailability());

    this.store.dispatch(getFoodAvailabilityData({ month: Number(this.selectedMonth) + 1 }));
    this.store.pipe(select(selectFoodAvailabilityData)).subscribe((data) => {
      this.foodAvailability = data;
    });

    const userID = Number(this.authService.getAuthDetails().userID);

    this.store.dispatch(getUserSelectedFood({ userID: userID, month: Number(this.selectedMonth) + 1 }));
    this.store.pipe(select(getUserSelectedFoodData)).subscribe((data) => {
      this.userSelectedFood = data;
    });

    this.generateCalendar(this.selectedMonth);
  }


  generateCalendar(month: number) {
    this.foodCalendar = [];

    const date = new Date();
    date.setMonth(month);
    date.setDate(1);

    const firstDay = date.getDay();
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();

    const weeks: number[][] = [];
    const foodWeeks: IFoodCalendar[][] = [];

    let week: number[] = new Array(7).fill(0);
    let foodWeek: IFoodCalendar[] = new Array(7).fill({ date: 0, food: '' });

    for (let i = 1; i <= daysInMonth; i++) {
      week[(firstDay + i - 1) % 7] = i;

      let foodItem: IFoodCalendar = {
        date: i,
        food: ''
      };

      const selectedFood = this.userSelectedFood.find(selected => {
        const selectedDate = new Date(selected.selectedDate);
        return selectedDate.getDate() === i &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === date.getFullYear();
      });

      if (selectedFood) {
        foodItem.food = selectedFood.selectedFood;
      }

      foodWeek[(firstDay + i - 1) % 7] = foodItem;

      if ((firstDay + i) % 7 === 0 || i === daysInMonth) {
        weeks.push(week);
        foodWeeks.push(foodWeek);
        week = new Array(7).fill(0);
        foodWeek = new Array(7).fill({ date: 0, food: '' });
      }
    }

    this.calendar = weeks;
    this.foodCalendar = foodWeeks;
  }


  openModal(day: number) {
    this.selectedDate = `${day}-${this.selectedMonth + 1}-${new Date().getFullYear()}`;

    const alreadySelected = this.foodCalendar.some(week =>
      week.some(dateFood => dateFood.date === day && dateFood.food !== '')
    );

    if (alreadySelected) {
      this.toastrService.info('You already selected the food.');
      return;
    }

    const modalElement = this.modal.nativeElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);

    const selectedDateObj = new Date(new Date().getFullYear(), this.selectedMonth, day);
    const availability = this.foodAvailability.find(fa => {
      const fromDate = new Date(fa.fromDate);
      const toDate = new Date(fa.toDate);
      return selectedDateObj >= fromDate && selectedDateObj <= toDate;
    });

    if (availability) {
      this.foodOptions = availability.menu.map((menuItem) => ({
        name: menuItem,
        value: menuItem
      }));

      if (this.foodOptions.length === 1) {
        this.selectedFood = this.foodOptions[0].value;
      } else {
        this.foodOptions.unshift({ name: 'Select food', value: '' });
        this.selectedFood = '';
      }

      modal.show();
    } else {
      this.toastrService.warning('Menu not yet updated.');
      this.foodOptions = [];
    }
  }

  saveChanges() {
    const userID = Number(this.authService.getAuthDetails().userID);

    this.store.dispatch(addUserSelectedFood({
      userID: userID,
      selectedDate: this.selectedDate,
      selectedFood: this.selectedFood
    }));
  }

  onDateChange() {
    this.fetchFoodCount();
  }

  fetchFoodCount() {
    this.foodService.getFoodCount(this.selectedDate_fc).subscribe({
      next: (response: HttpResponse<IFoodCount>) => {
        if (response.status === 200 && response.body !== null) {
          this.foodCount = response.body;
          console.log(this.foodCount.food_Count);
        }        
        else {
          console.error('No food count data available for the selected date.');
          this.foodCount = {
            selectedDate: new Date(this.selectedDate_fc),
            food_Count: {}
          };
        }
      },
      error: (error) => {
        console.error('Error fetching food count:', error);
        this.foodCount = {
          selectedDate: new Date(this.selectedDate_fc),
          food_Count: {}
        };
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.getAuthDetails().userTypeID === 2;
  }
}
