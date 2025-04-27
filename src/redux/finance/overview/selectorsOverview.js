export const selectFinanceOverview = (state) => state.finance?.overview || {};
export const selectFinanceLoading = (state) => state.finance?.loading || false;
export const selectFinanceError = (state) => state.finance?.error || null;
