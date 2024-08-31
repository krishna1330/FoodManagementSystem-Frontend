import { UsersEffect } from "./users/users.effect";
import { FoodAvailabilityEffect } from "./food-availability/food-availability.effect";
import { MenuEffect } from "./menu/menu.effect";
import { UserSelectedFoodEffect } from "./user-selected-food/user-selected-food.effect";

export const appEffect = [
    UsersEffect,
    FoodAvailabilityEffect,
    MenuEffect,
    UserSelectedFoodEffect
];