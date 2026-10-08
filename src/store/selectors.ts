import { createSelector } from "reselect";
import type { RootState } from "./types";

export const selectForm = (state: RootState) => state.form;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectUi = (state: RootState) => state.ui;

export const selectSortedProducts = createSelector(
  [
    (state: RootState) => state.products.items,
    (state: RootState) => state.ui.sortBy,
    (state: RootState) => state.ui.sortOrder,
  ],
  (items, sortBy, sortOrder) =>
    [...items].sort((first, second) => {
      const result =
        sortBy === "name"
          ? first.name.localeCompare(second.name)
          : first[sortBy] - second[sortBy];
      return sortOrder === "desc" ? -result : result;
    }),
);
