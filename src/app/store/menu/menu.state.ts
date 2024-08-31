import { IMenu } from "../../models/menu.model";

export interface MenuState {
    menu: IMenu[];
}

export const menuInitialState: MenuState = {
    menu: []
}