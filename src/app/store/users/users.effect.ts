import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUser, addUserFailure, addAdminSuccess, deleteUser, deleteUserFailure, deleteAdminSuccess, getAdmins, getAdminsFailure, getAdminsSuccess, getEmployees, getEmployeesFailure, getEmployeesSuccess, addEmployeeSuccess, deleteEmployeeSuccess } from "./users.action";
import { getAllAdmins, getAllEmployees } from "./users.selector";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UsersEffect {
    actions$ = inject(Actions);
    store = inject(Store);
    userService = inject(UserService);
    toastrService = inject(ToastrService);

    getAdmins$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAdmins),
            withLatestFrom(this.store.pipe(select(getAllAdmins))),
            mergeMap(([action, loaded]) => {
                if (loaded && loaded.length > 0) {
                    return of({ type: '[Admins] No Operation' });
                }
                return this.userService.getAdmins().pipe(
                    map((response) => {
                        if (response.status === 200) {
                            const users = response.body ?? [];
                            return getAdminsSuccess({ users });
                        } else {
                            const err = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return getAdminsFailure({ error: err });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(getAdminsFailure({ error }))
                    )
                );
            })
        )
    );

    getAdminsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getAdminsFailure),
                tap((action) => {
                    console.error('Unable to load admins', action.error);
                })
            ),
        { dispatch: false }
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            mergeMap((action) => {
                return this.userService.deleteUserByUserID(action.userID).pipe(
                    map((response) => {
                        if (response.status === 200) {
                            if (response.body == 'Admin deleted successfully.') {
                                this.toastrService.success(response.body || 'Admin deleted successfully.');
                                return deleteAdminSuccess({ userID: action.userID });
                            } else {
                                this.toastrService.success(response.body || 'Employee deleted successfully.');
                                return deleteEmployeeSuccess({ userID: action.userID });
                            }
                        } else {
                            const err = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return deleteUserFailure({ error: err });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(deleteUserFailure({ error }))
                    )
                );
            })
        )
    );

    deleteUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteUserFailure),
                tap((action) => {
                    this.toastrService.error(action.error.message);
                    console.error('Unable to delete admin', action.error);
                })
            ),
        { dispatch: false }
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            mergeMap(action =>
                this.userService.addUser(action.userTypeID, action.firstName, action.lastName, action.emailID, action.phone, action.createdBy).pipe(
                    map(response => {
                        if (response.status === 200) {
                            const user = response.body;
                            if (user !== null) {
                                if (user.userTypeID === 2) {
                                    this.toastrService.success('Admin added successfuuly.');
                                    return addAdminSuccess({ admins: user });
                                } else {
                                    this.toastrService.success('Employee added successfuuly.');
                                    return addEmployeeSuccess({ employees: user });
                                }
                            } else {
                                const error = new HttpErrorResponse({
                                    status: 204,
                                    statusText: 'No Content',
                                    url: response.url || '',
                                });
                                return addUserFailure({ error });
                            }
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return addUserFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(addUserFailure({ error }))
                    )
                )
            )
        )
    );

    addUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addUserFailure),
                tap((action) => {
                    this.toastrService.error(action.error.message);
                    console.error('Unable to add user', action.error);
                })
            ),
        { dispatch: false }
    );

    getEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getEmployees),
            withLatestFrom(this.store.pipe(select(getAllEmployees))),
            mergeMap(([action, loaded]) => {
                if (loaded && loaded.length > 0) {
                    return of({ type: '[Employees] No Operation' });
                }
                return this.userService.getEmployees().pipe(
                    map((response) => {
                        if (response.status === 200) {
                            const employees = response.body ?? [];
                            return getEmployeesSuccess({ employees });
                        } else {
                            const err = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return getEmployeesFailure({ error: err });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(getEmployeesFailure({ error }))
                    )
                );
            })
        )
    );


    getEmployeesFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getEmployeesFailure),
                tap((action) => {
                    console.error('Unable to load employees', action.error);
                })
            ),
        { dispatch: false }
    );
}