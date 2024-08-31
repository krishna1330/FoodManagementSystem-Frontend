import { AdminsState, EmployeesState } from "./users/users.state";
import { FoodAvaiabilityState } from "./food-availability/food-availability.state";
import { MenuState } from "./menu/menu.state";
import { UserSelectedFoodState } from "./user-selected-food/user-selected-food.state";

export interface IAppState {
    employees: EmployeesState,
    admins: AdminsState,
    foodAvailability: FoodAvaiabilityState,
    menu: MenuState,
    userSelectedFood: UserSelectedFoodState
}