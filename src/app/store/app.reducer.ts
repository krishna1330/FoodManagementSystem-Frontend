import { adminsReducer, employeesReducer } from "./users/users.reducer";
import { foddAvailabilityReducer } from "./food-availability/food-avaialability.reducer";
import { menuReducer } from "./menu/menu.reducer";
import { userSelectedFoodReducer } from "./user-selected-food/user-selected-food.reducer";

export const appReducer = {
    employees: employeesReducer,
    admins: adminsReducer,
    foodAvailability: foddAvailabilityReducer,
    menu: menuReducer,
    userSelectedFood: userSelectedFoodReducer
}