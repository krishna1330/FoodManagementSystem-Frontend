import { createAction, props } from "@ngrx/store"
import { IUserSelectedFood } from "../../models/user-selected-food.model"
import { HttpErrorResponse } from "@angular/common/http"

// get user selected food
export const getUserSelectedFood = createAction(
    '[User Selected Food] get user selected food',
    props<{ userID: number, month: number }>()
)

export const getUserSelectedFoodSuccess = createAction(
    '[User Selected Food] get user selected food success',
    props<{ userSelectedFood: IUserSelectedFood[] }>()
)

export const getUserSelectedFoodFailure = createAction(
    '[User Selected Food] get user selected food failure',
    props<{ error: HttpErrorResponse }>()
)

// add user selected food
export const addUserSelectedFood = createAction(
    '[User Selected Food] add user selected food',
    props<{ userID: Number, selectedDate: string, selectedFood: string }>()
)

export const addUserSelectedFoodSuccess = createAction(
    '[User Selected Food] add user selected food success',
    props<{ userSelectedFood: IUserSelectedFood }>()
)

export const addUserSelectedFoodFailure = createAction(
    '[User Selected Food] add user selected food failure',
    props<{ error: HttpErrorResponse }>()
)

// clear the user selected food
export const clearUserSelectedFood = createAction('[User Selected Food] Clear');