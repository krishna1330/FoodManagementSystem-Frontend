import { createReducer, on } from "@ngrx/store";
import { menuInitialState } from "./menu.state";
import { clearMenu, getMenuSuccess } from "./menu.action";

export const menuReducer = createReducer(
    menuInitialState,

    on(getMenuSuccess, (state, action) => ({
        ...state,
        menu: action.menu
    })),

    on(clearMenu, (state) => ({
        ...menuInitialState
    }))
);