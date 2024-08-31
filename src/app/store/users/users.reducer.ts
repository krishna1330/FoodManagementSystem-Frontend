import { createReducer, on } from "@ngrx/store";
import { adminsInitialState, employeesInitialState } from "./users.state";
import { addAdminSuccess, addEmployeeSuccess, clearAdmins, clearEmployees, deleteAdminSuccess, deleteEmployeeSuccess, getAdminsSuccess, getEmployeesSuccess } from "./users.action";

export const employeesReducer = createReducer(
    employeesInitialState,

    on(getEmployeesSuccess, (state, action) => ({
        ...state,
        employees: action.employees
    })),

    on(addEmployeeSuccess, (state, action) => ({
        ...state,
        employees: [...state.employees, action.employees]
    })),

    on(deleteEmployeeSuccess, (state, action) => ({
        ...state,
        employees: state.employees.filter(employee => employee.userID !== action.userID)
    })),

    on(clearEmployees, (state) => ({
        ...employeesInitialState
    })),
);

export const adminsReducer = createReducer(
    adminsInitialState,

    on(getAdminsSuccess, (state, action) => ({
        ...state,
        admins: action.users
    })),

    on(deleteAdminSuccess, (state, action) => ({
        ...state,
        admins: state.admins.filter(admin => admin.userID !== action.userID)
    })),

    on(addAdminSuccess, (state, action) => ({
        ...state,
        admins: [...state.admins, action.admins]
    })),

    on(clearAdmins, (state) => ({
        ...adminsInitialState
    })),
)