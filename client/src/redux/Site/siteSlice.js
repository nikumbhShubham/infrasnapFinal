import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sites: [],
  currentSite: null, // Initialize currentSite as null
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    addSite: (state, action) => {
      state.sites.push(action.payload); // Add new site to the array
    },
    updateSite: (state, action) => {
      const index = state.sites.findIndex(site => site.id === action.payload.id);
      if (index !== -1) {
        state.sites[index] = action.payload; // Update existing site
      }
    },
    removeSite: (state, action) => {
      state.sites = state.sites.filter(site => site.id !== action.payload); // Remove site by ID
    },
    setSites: (state, action) => {
      state.sites = action.payload; // Set multiple sites at once
    },
    setCurrentSite: (state, action) => {
      const site = state.sites.find(site => site.id === action.payload);
      state.currentSite = site || null; // Set current site by ID or null if not found
    },
    clearCurrentSite: (state) => {
      state.currentSite = null; // Clear the current site
    },
  },
});

export const { 
  addSite, 
  updateSite, 
  removeSite, 
  setSites, 
  setCurrentSite, 
  clearCurrentSite 
} = sitesSlice.actions;

export default sitesSlice.reducer;