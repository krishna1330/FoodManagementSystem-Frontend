import { createAction, props } from "@ngrx/store"
import { IAddFoodAvailability, IFoodAvaialability } from "../../models/food-availability.model"
import { HttpErrorResponse } from "@angular/common/http"

// get food availability
export const getFoodAvailabilityData = createAction(
    '[Food Availability] get food avaialability data',
    props<{ month: Number }>()
)

export const getFoodAvailabilityDataSuccess = createAction(
    '[Food Availability] get food avaialability data success',
    props<{ foodAvailability: IFoodAvaialability[] }>()
)

export const getFoodAvailabilityDataFailure = createAction(
    '[Food Availability] get food avaialability data failure',
    props<{ error: HttpErrorResponse }>()
)

// add food availability
export const addFoodAvailabilityData = createAction(
    '[Food Availability] add food avaialability data',
    props<{ data: IAddFoodAvailability }>()
)

export const addFoodAvailabilityDataSuccess = createAction(
    '[Food Availability] add food avaialability data success',
    props<{ foodAvailability: IFoodAvaialability }>()
)

export const addFoodAvailabilityDataFailure = createAction(
    '[Food Availability] add food avaialability data failure',
    props<{ error: HttpErrorResponse }>()
)

// clear the food availability
export const clearFoodAvailability = createAction('[Food Availability] Clear');