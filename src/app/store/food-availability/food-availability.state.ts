import { IFoodAvaialability } from "../../models/food-availability.model";

export interface FoodAvaiabilityState {
    foodAvailability: IFoodAvaialability[];
}

export const foodAvailabilityInitialState: FoodAvaiabilityState = {
    foodAvailability: []
}