import { IUserSelectedFood } from "../../models/user-selected-food.model";

export interface UserSelectedFoodState {
    userSelectedFood: IUserSelectedFood[];
}

export const userSelectedFoodInitialState: UserSelectedFoodState = {
    userSelectedFood: []
}