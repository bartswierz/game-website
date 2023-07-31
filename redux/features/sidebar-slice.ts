import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    // isSidebarOpen: false,
    isSidebarOpen: true,
  },
};

export const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    // toggleSidebar: (state, action: PayloadAction<boolean>) => {
    //   // TOGGLE LOGIC - Flipping value upon user clicking hamburger menu
    //   console.log("action.payload passed: ", action.payload);
    //   console.log("TOGGLE SIDEBAR, isSidebarOpen value: ", state.value.isSidebarOpen);
    //   state.value.isSidebarOpen = action.payload;
    //   console.log("isSidebarOpen AFTER: ", state.value.isSidebarOpen);
    // },
    // closeSidebar: (state, action: PayloadAction<boolean>) => {
    //   state.value.isSidebarOpen = false;
    //   console.log("SLICE - CLOSE SIDEBAR - value", state.value.isSidebarOpen);
    // },
    // openSidebar: (state, action: PayloadAction<boolean>) => {
    //   state.value.isSidebarOpen = payloadAction;
    //   console.log("SLICE - OPEN SIDEBAR - value", state.value.isSidebarOpen);
    // },
    // ORIGINAL
    toggleSidebar: (state) => {
      // TOGGLE LOGIC - Flipping value upon user clicking hamburger menu
      state.value.isSidebarOpen = !state.value.isSidebarOpen;
      console.log("SLICE - TOGGLE SIDEBAR, isSidebarOpen value: ", state.value.isSidebarOpen);
    },
    closeSidebar: (state) => {
      console.log("SLICE - CLOSE SIDEBAR - value", state.value.isSidebarOpen);
      state.value.isSidebarOpen = false;
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
