import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    typeFilter: {
      options: ["relevance", "hot", "new", "top"],
      selected: "hot"
      // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option. Likely "setState" isn't the appropriate name.
    },
    timeFilter: {
      options: ["any time", "past day", "past week", "past month", "past year"],
      disabled: true,
      selected: "any time"
      // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option. Likely "setState" isn't the appropriate name.
    }
  },
  reducers: {}
});

export const selectTypeFilter = (state) => state.filters.typeFilter;
export const selectTimeFilter = (state) => state.filters.timeFilter;

export default filtersSlice.reducer;
