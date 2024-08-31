import { createReducer, on } from "@ngrx/store";
import { userSelectedFoodInitialState, UserSelectedFoodState } from "./user-selected-food.state";
import { addUserSelectedFoodSuccess, clearUserSelectedFood, getUserSelectedFoodSuccess } from "./user-selected-food.action";

export const userSelectedFoodReducer = createReducer(
    userSelectedFoodInitialState,

    on(getUserSelectedFoodSuccess, (state: UserSelectedFoodState, action) => ({
        ...state,
        userSelectedFood: action.userSelectedFood
    })),

    on(addUserSelectedFoodSuccess, (state, action) => ({
        ...state,
        userSelectedFood: [...state.userSelectedFood, action.userSelectedFood]
    })),

    on(clearUserSelectedFood, (state) => ({
        ...userSelectedFoodInitialState
    })),
);
