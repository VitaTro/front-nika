import { createSelector } from "reselect";

const selectFinanceSettingsState = (state) => state.financeSettings || {};

export const selectFinanceSettings = createSelector(
  [selectFinanceSettingsState],
  (financeSettings) => financeSettings.settings || {}
);

export const selectFinanceSettingsLoading = createSelector(
  [selectFinanceSettingsState],
  (financeSettings) => financeSettings.loading || false
);

export const selectFinanceSettingsError = createSelector(
  [selectFinanceSettingsState],
  (financeSettings) => financeSettings.error || null
);
