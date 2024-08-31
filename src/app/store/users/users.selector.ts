import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminsState, EmployeesState } from "./users.state";

export const employeesSelector = createFeatureSelector<EmployeesState>('employees');

export const adminsSelector = createFeatureSelector<AdminsState>('admins');

export const getAllAdmins = createSelector(
    adminsSelector,
    (state: AdminsState) => state.admins || []
);

export const getAllEmployees = createSelector(
    employeesSelector,
    (state: EmployeesState) => state.employees || []
);

// export const getAllAdmins = createSelector(
//     usersSelector,
//     (state: UsersState) => state.users.filter(user => user.userTypeID === 2)
// );

// export const getAllEmployees = createSelector(
//     usersSelector,
//     (state: UsersState) => state.users.filter(user => user.userTypeID === 3)
// );
