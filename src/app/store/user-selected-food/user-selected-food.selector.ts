import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserSelectedFoodState } from "./user-selected-food.state";

export const userSelectedFoodSelector = createFeatureSelector<UserSelectedFoodState>('userSelectedFood');

export const getUserSelectedFoodData = createSelector(
    userSelectedFoodSelector,
    (state: UserSelectedFoodState) => state.userSelectedFood || []
);