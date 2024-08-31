import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from '../models/auth.model';
import { environment } from '../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearFoodAvailability } from '../store/food-availability/food-availability.action';
import { clearMenu } from '../store/menu/menu.action';
import { clearUserSelectedFood } from '../store/user-selected-food/user-selected-food.action';
import { clearAdmins, clearEmployees } from '../store/users/users.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  httpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  store = inject(Store);

  login(emailID: string, password: string): Observable<HttpResponse<IAuth>> {
    let params = new HttpParams()
      .set('emailID', emailID)
      .set('password', password);

    return this.httpClient.post<IAuth>(`${environment.apiUrl}Auth/Login`, null, { params, observe: 'response' });
  }

  saveToCookies(user: IAuth) {
    if (user != null) {
      this.cookieService.set('token', user.token);
      this.cookieService.set('userID', user.userID.toString());
      this.cookieService.set('userTypeID', user.userTypeID.toString());
      this.cookieService.set('firstName', user.firstName);
      this.cookieService.set('lastName', user.lastName);
      this.cookieService.set('emailID', user.emailID);
      this.cookieService.set('phone', user.phone);
    }
  }

  isAuthenticated() {
    return this.cookieService.get('token') !== null;
  }

  getAuthDetails(): IAuth {
    const auth: IAuth = {
      token: this.cookieService.get('token') || '',
      userID: Number(this.cookieService.get('userID') || 0),
      userTypeID: Number(this.cookieService.get('userTypeID') || 0),
      firstName: this.cookieService.get('firstName') || '',
      lastName: this.cookieService.get('lastName') || '',
      emailID: this.cookieService.get('emailID') || '',
      phone: this.cookieService.get('phone') || '',
      responseMessage: ""
    };

    return auth;
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userID');
    this.cookieService.delete('userTypeID');
    this.cookieService.delete('firstName');
    this.cookieService.delete('lastName');
    this.cookieService.delete('emailID');
    this.cookieService.delete('phone');

    this.store.dispatch(clearFoodAvailability());
    this.store.dispatch(clearMenu());
    this.store.dispatch(clearUserSelectedFood());
    this.store.dispatch(clearAdmins());
    this.store.dispatch(clearEmployees());

    this.router.navigate(['/login']);
  }

}
