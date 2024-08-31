import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAddFoodAvailability, IFoodAvaialability } from '../models/food-availability.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { IMenu } from '../models/menu.model';
import { IFoodCount, IUserSelectedFood } from '../models/user-selected-food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  httpClient = inject(HttpClient);

  getFoodAvailabilityData(month: Number): Observable<HttpResponse<IFoodAvaialability[]>> {
    return this.httpClient.get<IFoodAvaialability[]>(`${environment.apiUrl}Food/Food-Availability?month=${month}`, { observe: 'response' })
  }

  getMenu(): Observable<HttpResponse<IMenu[]>> {
    return this.httpClient.get<IMenu[]>(`${environment.apiUrl}Food/Menu`, { observe: 'response' })
  }

  addFoodAvailability(data: IAddFoodAvailability): Observable<HttpResponse<IFoodAvaialability>> {
    return this.httpClient.post<IFoodAvaialability>(`${environment.apiUrl}Food/Add-Food-Availability`, data, { observe: 'response' });
  }

  getUserSelectedFood(userID: number, month: number): Observable<HttpResponse<IUserSelectedFood[]>> {
    return this.httpClient.get<IUserSelectedFood[]>(`${environment.apiUrl}Food/User-Selected-Food?userID=${userID}&month=${month}`, { observe: 'response' });
  }

  addUserSelectedFood(userID: Number, selectedDate: string, selectedFood: string): Observable<HttpResponse<IUserSelectedFood>> {
    const [day, month, year] = selectedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day + 1);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    const formattedDate = date.toISOString();

    const data = {
      userID: userID,
      selectedDate: formattedDate,
      selectedFood: selectedFood
    }
    return this.httpClient.post<IUserSelectedFood>(`${environment.apiUrl}Food/Add-User-Food`, data, { observe: 'response' });
  }

  getFoodCount(selectedDate: string): Observable<HttpResponse<IFoodCount>> {
    return this.httpClient.get<IFoodCount>(`${environment.apiUrl}Food/Food-Count?selectedDate=${selectedDate}`, { observe: 'response' });
  }
}

