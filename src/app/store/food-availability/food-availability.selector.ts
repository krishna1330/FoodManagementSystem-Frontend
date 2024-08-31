import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FoodAvaiabilityState } from "./food-availability.state";

export const foodAvaiabilitySelector = createFeatureSelector<FoodAvaiabilityState>('foodAvailability');

export const getFoodAvailabilityData = createSelector(
    foodAvaiabilitySelector,
    (state: FoodAvaiabilityState) => state.foodAvailability || []
);
