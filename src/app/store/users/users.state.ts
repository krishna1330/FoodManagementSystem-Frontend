import { IUser } from "../../models/user.model";

export interface AdminsState {
    admins: IUser[];
}

export const adminsInitialState: AdminsState = {
    admins: []
}

export interface EmployeesState {
    employees: IUser[];
}

export const employeesInitialState: EmployeesState = {
    employees: []
}