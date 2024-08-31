import { createReducer, on } from "@ngrx/store";
import { foodAvailabilityInitialState } from "./food-availability.state";
import { addFoodAvailabilityDataSuccess, clearFoodAvailability, getFoodAvailabilityDataSuccess } from "./food-availability.action";

export const foddAvailabilityReducer = createReducer(
    foodAvailabilityInitialState,

    on(getFoodAvailabilityDataSuccess, (state, action) => ({
        ...state,
        foodAvailability: action.foodAvailability
    })),

    on(addFoodAvailabilityDataSuccess, (state, action) => ({
        ...state,
        foodAvailability: [...state.foodAvailability, action.foodAvailability]
    })),

    on(clearFoodAvailability, (state) => ({
        ...foodAvailabilityInitialState
    }))
);