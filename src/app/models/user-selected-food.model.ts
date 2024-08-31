export interface IUserSelectedFood {
    userID: number;
    userFoodID: number;
    menuID: number;
    selectedFood: string;
    selectedDate: Date;
    isActive: boolean;
}

export interface IFoodCalendar {
    date: number;
    food: string;
}

export interface IFoodCount {
    selectedDate: Date;
    food_Count: { [key: string]: number };
}
