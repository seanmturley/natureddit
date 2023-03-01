import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    typeFilter: {
      options: ["relevance", "hot", "new", "top"],
      selected: "hot"
    },
    timeFilter: {
      options: ["any time", "past day", "past week", "past month", "past year"],
      disabled: true,
      selected: "any time"
    }
  },
  reducers: {
    updateSelectedTypeFilter: (state, action) => {
      state.typeFilter.selected = action.payload;
    }
  }
});

export const selectTypeFilter = (state) => state.filters.typeFilter;
export const selectTimeFilter = (state) => state.filters.timeFilter;

export const { updateSelectedTypeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
