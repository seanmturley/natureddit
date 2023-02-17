import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    typeFilter: {
      options: ["Relevance", "Hot", "New", "Top"],
      selected: "Hot"
      // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option. Likely "setState" isn't the appropriate name.
    },
    timeFilter: {
      options: ["Any time", "Past day", "Past week", "Past month", "Past year"],
      disabled: true,
      selected: "Any time"
      // setState: Action for new API call and updating "selected" i.e. what happens when the user clicks a filter option. Likely "setState" isn't the appropriate name.
    }
  },
  reducers: {}
});

export const selectTypeFilter = (state) => state.filters.typeFilter;
export const selectTimeFilter = (state) => state.filters.timeFilter;

export default filtersSlice.reducer;
