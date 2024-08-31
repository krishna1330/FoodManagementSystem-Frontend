import { inject, Injectable } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { addFoodAvailabilityData, addFoodAvailabilityDataFailure, addFoodAvailabilityDataSuccess, getFoodAvailabilityData, getFoodAvailabilityDataFailure, getFoodAvailabilityDataSuccess } from './food-availability.action';
import { catchError, map, merge, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { getFoodAvailabilityData as selectFoodAvailabilityData } from './food-availability.selector';

@Injectable()
export class FoodAvailabilityEffect {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private foodService = inject(FoodService);

    getFoodAvailabilityData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFoodAvailabilityData),
            withLatestFrom(this.store.pipe(select(selectFoodAvailabilityData))),
            mergeMap(([action, foodAvailabilityData]) => {
                if (foodAvailabilityData.length > 0) {
                    return of({ type: '[Food Availability] No Operation' });
                }
                return this.foodService.getFoodAvailabilityData(action.month).pipe(
                    map((response) => {
                        if (response.status === 200) {
                            const foodAvailability = response.body ?? [];
                            return getFoodAvailabilityDataSuccess({ foodAvailability });
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return getFoodAvailabilityDataFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(getFoodAvailabilityDataFailure({ error }))
                    )
                );
            })
        )
    );

    getFoodAvailabilityFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getFoodAvailabilityDataFailure),
                tap((action) => {
                    console.error('Unable to load food availability data', action.error);
                })
            ),
        { dispatch: false }
    );

    addFoodAvailability$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addFoodAvailabilityData),
            mergeMap(action =>
                this.foodService.addFoodAvailability(action.data).pipe(
                    map(response => {
                        if (response.status === 200) {
                            const foodAvailability = response.body;
                            if (foodAvailability !== null) {
                                return addFoodAvailabilityDataSuccess({ foodAvailability });
                            } else {
                                const error = new HttpErrorResponse({
                                    status: 204,
                                    statusText: 'No Content',
                                    url: response.url || '',
                                });
                                return addFoodAvailabilityDataFailure({ error });
                            }
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return addFoodAvailabilityDataFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(addFoodAvailabilityDataFailure({ error }))
                    )
                )
            )
        )
    );

    addFoodAvailabilityFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addFoodAvailabilityDataFailure),
                tap((action) => {
                    console.error('Unable to add food availability data', action.error);
                })
            ),
        { dispatch: false }
    );
}
