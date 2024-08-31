export interface IFoodAvaialability {
    foodAvailabilityID: number;
    createdAdminID: number;
    monthNumber: number;
    fromDate: Date;
    toDate: Date;
    menu: string[];
}

export interface IAddFoodAvailability {
    fromDate: string;
    toDate: string;
    menuIDs: number[];
    createdAdminID: number;
}
