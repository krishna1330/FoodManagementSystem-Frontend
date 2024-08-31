import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { FoodAvailabilityComponent } from './components/food-availability/food-availability.component';
import { FoodComponent } from './components/food/food.component';
import { EmployeesComponent } from './components/employees/employees.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'admins', component: AdminComponent, canActivate: [authGuard] },
    { path: 'food-availability', component: FoodAvailabilityComponent, canActivate: [authGuard] },
    { path: 'food', component: FoodComponent, canActivate: [authGuard] },
    { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] }
];
