import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    typeFilter: {
      options: [],
      selected: "hot"
    },
    timeFilter: {
      options: ["hour", "day", "week", "month", "year", "all"],
      disabled: true,
      selected: "day"
    }
  },
  reducers: {
    updateTypeFilterOptions: (state, action) => {
      let typeFilterOptions = ["hot", "new", "top"];

      if (action.payload.startsWith("/search")) {
        typeFilterOptions = ["relevance", ...typeFilterOptions];
      }

      state.typeFilter.options = typeFilterOptions;
    },
    updateSelectedTypeFilter: (state, action) => {
      state.typeFilter.selected = action.payload;
      state.timeFilter.disabled = action.payload !== "top";
    },
    updateSelectedTimeFilter: (state, action) => {
      state.timeFilter.selected = action.payload;
    }
  }
});

export const selectTypeFilter = (state) => state.filters.typeFilter;
export const selectTimeFilter = (state) => state.filters.timeFilter;

export const {
  updateTypeFilterOptions,
  updateSelectedTypeFilter,
  updateSelectedTimeFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
