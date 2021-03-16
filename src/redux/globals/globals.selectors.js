import { createSelector } from "reselect";

const selectGlobals = (state) => state.globals;

export const selectGlobalsSettings = createSelector([selectGlobals], (globals) => globals.settings);

export const selectIsLoading = createSelector([selectGlobals], (globals) => globals.isLoading);
