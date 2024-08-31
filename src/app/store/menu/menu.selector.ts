import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuState } from "./menu.state";

export const menuSelector = createFeatureSelector<MenuState>('menu');

export const getMenuDetails = createSelector(
    menuSelector,
    (state: MenuState) => state.menu || []
);