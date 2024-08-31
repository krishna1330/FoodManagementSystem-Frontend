import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { FoodService } from "../../services/food.service";
import { getMenu, getMenuFailure, getMenuSuccess } from "./menu.action";
import { map, mergeMap, of, catchError, withLatestFrom, tap } from "rxjs";
import { getMenuDetails } from "./menu.selector";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class MenuEffect {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private foodService = inject(FoodService);

    getMenu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getMenu),
            withLatestFrom(this.store.pipe(select(getMenuDetails))),
            mergeMap(([action, menu]) => {
                if (menu && menu.length > 0) {
                    return of({ type: '[Menu] No Operation' });
                }
                return this.foodService.getMenu().pipe(
                    map((response) => {
                        const menuData = response.body ?? [];
                        return getMenuSuccess({ menu: menuData });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(getMenuFailure({ error }))
                    )
                );
            })
        )
    );

    getMenuFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getMenuFailure),
                tap((action) => {
                    console.error('Unable to load menu', action.error);
                })
            ),
        { dispatch: false }
    );
}
