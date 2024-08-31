import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from '../environments/environment.development';
import { IResponse } from '../models/string-response.model';
import { IFoodCount } from '../models/user-selected-food.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  httpClient = inject(HttpClient);

  getAdmins(): Observable<HttpResponse<IUser[]>> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}Users/Get-Admins`, { observe: 'response' })
  }

  deleteUserByUserID(userID: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete(`${environment.apiUrl}Users/Delete-User?userID=` + userID, { observe: 'response', responseType: 'text' });
  }

  addUser(userTypeID: Number, firstName: string, lastName: string, emailID: string, phone: string, createdBy: Number): Observable<HttpResponse<IUser>> {
    const newUser = {
      userTypeID: userTypeID,
      firstName: firstName,
      lastName: lastName,
      emailID: emailID,
      phone: phone,
      createdBy: createdBy
    };
    return this.httpClient.post<IUser>(`${environment.apiUrl}Users/Add-User`, newUser, { observe: 'response' });
  }

  getEmployees(): Observable<HttpResponse<IUser[]>> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}Users/Get-Employees`, { observe: 'response' })
  }
}
