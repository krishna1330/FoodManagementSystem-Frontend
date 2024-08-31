import { createAction, props } from "@ngrx/store"
import { IMenu } from "../../models/menu.model"
import { HttpErrorResponse } from "@angular/common/http"

export const getMenu = createAction(
    '[Menu] get menu'
)

export const getMenuSuccess = createAction(
    '[Menu] get menu success',
    props<{ menu: IMenu[] }>()
)

export const getMenuFailure = createAction(
    '[Menu] get menu failure',
    props<{ error: HttpErrorResponse }>()
)


// clear the food availability
export const clearMenu = createAction('[Menu] Clear');