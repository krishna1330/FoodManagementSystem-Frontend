import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { FoodService } from "../../services/food.service";
import { addUserSelectedFood, addUserSelectedFoodFailure, addUserSelectedFoodSuccess, getUserSelectedFood, getUserSelectedFoodFailure, getUserSelectedFoodSuccess } from "./user-selected-food.action";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { getUserSelectedFoodData } from "./user-selected-food.selector";

@Injectable()
export class UserSelectedFoodEffect {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private foodService = inject(FoodService);

    getUserSelectedFood$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserSelectedFood),
            withLatestFrom(this.store.pipe(select(getUserSelectedFoodData))),
            mergeMap(([action, userSelectedFood]) => {
                if (userSelectedFood.length > 0) {
                    return of({ type: '[User Selected Food] No Operation' });
                }
                return this.foodService.getUserSelectedFood(action.userID, action.month).pipe(
                    map((response) => {
                        if (response.status === 200) {
                            const userSelectedFood = response.body ?? [];
                            return getUserSelectedFoodSuccess({ userSelectedFood });
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return getUserSelectedFoodFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(getUserSelectedFoodFailure({ error }))
                    )
                );
            })
        )
    );

    getUserSelectedFoodFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserSelectedFoodFailure),
            tap((action) => {
                console.error('Unable to load user selected food data', action.error);
            })
        ),
        { dispatch: false }
    );

    addtUserSelectedFood$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserSelectedFood),
            mergeMap(action =>
                this.foodService.addUserSelectedFood(action.userID, action.selectedDate, action.selectedFood).pipe(
                    map(response => {
                        if (response.status === 200) {
                            const userSelectedFood = response.body;
                            if (userSelectedFood !== null) {
                                return addUserSelectedFoodSuccess({ userSelectedFood });
                            } else {
                                const error = new HttpErrorResponse({
                                    status: 204,
                                    statusText: 'No Content',
                                    url: response.url || '',
                                });
                                return addUserSelectedFoodFailure({ error });
                            }
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return addUserSelectedFoodFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(addUserSelectedFoodFailure({ error }))
                    )
                )
            )
        )
    );

    addUserSelectedFoodFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserSelectedFoodFailure),
            tap((action) => {
                console.error('Unable to add user selected food', action.error);
            })
        ),
        { dispatch: false }
    );
}
