import { createAction, props } from "@ngrx/store";
import { IUser } from "../../models/user.model";
import { HttpErrorResponse } from "@angular/common/http";

// Get all admins
export const getAdmins = createAction(
    '[Admin] get admins'
)

export const getAdminsSuccess = createAction(
    '[Admin] get admins success',
    props<{ users: IUser[] }>()
)

export const getAdminsFailure = createAction(
    '[Admin] get admins failure',
    props<{ error: HttpErrorResponse }>()
)

// Delete a user
export const deleteUser = createAction(
    '[User] delete user',
    props<{ userID: number }>()
)

export const deleteAdminSuccess = createAction(
    '[User] delete admin success',
    props<{ userID: number }>()
)

export const deleteEmployeeSuccess = createAction(
    '[User] delete employee success',
    props<{ userID: number }>()
)

export const deleteUserFailure = createAction(
    '[User] delete user failure',
    props<{ error: HttpErrorResponse }>()
)

// Add user
export const addUser = createAction(
    '[Admin] add user',
    props<{ userTypeID: number, firstName: string, lastName: string, emailID: string, phone: string, createdBy: number }>()
)

export const addAdminSuccess = createAction(
    '[Admin] add user success',
    props<{ admins: IUser }>()
)

export const addEmployeeSuccess = createAction(
    '[Employee] add user success',
    props<{ employees: IUser }>()
)

export const addUserFailure = createAction(
    '[Admin] add user failure',
    props<{ error: HttpErrorResponse }>()
)

// Get all employees
export const getEmployees = createAction(
    '[Employees] get employees'
)

export const getEmployeesSuccess = createAction(
    '[Employees] get employees success',
    props<{ employees: IUser[] }>()
)

export const getEmployeesFailure = createAction(
    '[Employees] get employees failure',
    props<{ error: HttpErrorResponse }>()
)


// clear admins
export const clearAdmins = createAction('[Admins] Clear');

// clear employees
export const clearEmployees = createAction('[Employees] Clear');