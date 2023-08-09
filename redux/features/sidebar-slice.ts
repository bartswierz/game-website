import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isSidebarOpen: false,
    // isSidebarOpen: true,
    isMenuToggled: false,
    isDesktop: true,
  },
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      // TOGGLE LOGIC - Flipping value upon user clicking hamburger menu
      state.value.isMenuToggled = !state.value.isMenuToggled;

      // If hamburger menu is toggled, open sidebar
      if (state.value.isMenuToggled) state.value.isSidebarOpen = true;
      else state.value.isSidebarOpen = false;
    },
    // FUNCTIONS BELOW AUTOMATICALLY CLOSE/OPEN SIDEBAR AS USER MOVES FROM DESKTOP TO MOBILE AND VICE VERSA
    closeSidebar: (state) => {
      console.log("SLICE - CLOSE SIDEBAR - value", state.value.isSidebarOpen);
      state.value.isSidebarOpen = false;
      // Closing isMenuToggled incase user increases screen width while hamburger menu is toggled
      state.value.isMenuToggled = false;
    },
    openSidebar: (state) => {
      console.log("SLICE - OPEN SIDEBAR - value", state.value.isSidebarOpen);
      state.value.isSidebarOpen = true;
    },
  },
});

// EXPORT FUNCTIONS/ACTIONS
// export const { toggleSidebar } = sidebarSlice.actions;
export const { toggleSidebar, closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
