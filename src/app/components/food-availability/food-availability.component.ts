import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from '../../interceptors/auth.interceptor';
import { Store, select } from '@ngrx/store';
import { addFoodAvailabilityData, getFoodAvailabilityData } from '../../store/food-availability/food-availability.action';
import { IAddFoodAvailability, IFoodAvaialability } from '../../models/food-availability.model';
import { getFoodAvailabilityData as selectFoodAvailabilityData } from '../../store/food-availability/food-availability.selector';
import { getMenu } from '../../store/menu/menu.action';
import { IMenu } from '../../models/menu.model';
import { getMenuDetails } from '../../store/menu/menu.selector';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-food-availability',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true,
    },
  ],
  templateUrl: './food-availability.component.html',
  styleUrls: ['./food-availability.component.scss']
})
export class FoodAvailabilityComponent implements OnInit {

  private store = inject(Store);
  authService = inject(AuthService);

  foodAvailability: IFoodAvaialability[] = [];
  menu: IMenu[] = [];

  fromDate!: Date;
  toDate!: Date;
  selectedMenu: number[] = [];
  isAdding = false;
  currentMonth: number = new Date().getMonth();

  ngOnInit(): void {
    this.store.dispatch(getFoodAvailabilityData({ month: Number(this.currentMonth) + 1 }));
    this.store.pipe(select(selectFoodAvailabilityData)).subscribe((data) => {
      this.foodAvailability = data;
    });

    this.store.dispatch(getMenu());
    this.store.pipe(select(getMenuDetails)).subscribe((data) => {
      this.menu = data;
    });
  }

  onMenuSelectionChange(menuID: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedMenu.push(menuID);
    } else {
      this.selectedMenu = this.selectedMenu.filter(id => id !== menuID);
    }
  }

  onAddFoodAvailability() {
    this.isAdding = true;
    this.selectedMenu = [];
    this.fromDate = new Date();
    this.toDate = new Date();
  }

  saveFoodAvailability() {
    const adminID = this.authService.getAuthDetails().userID;
    if (!this.fromDate || !this.toDate) {
      console.error('From Date or To Date is not set');
      return;
    }

    const fromDate = new Date(this.fromDate);
    const toDate = new Date(this.toDate);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      console.error('Invalid From Date or To Date');
      return;
    }


    const payload: IAddFoodAvailability = {
      fromDate: new Date(this.fromDate).toISOString(),
      toDate: new Date(this.toDate).toISOString(),
      menuIDs: this.selectedMenu,
      createdAdminID: this.authService.getAuthDetails().userID
    };

    this.store.dispatch(addFoodAvailabilityData({ data: payload }));

    this.isAdding = false;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.selectedMenu = [];
  }
}
