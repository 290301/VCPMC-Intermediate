import { createSlice, PayloadAction } from '@reduxjs/toolkit';
function setWidthSidebar(newWidth: string) {
      document.documentElement.style.setProperty('--width-table-content', newWidth);
}
export const SidebarSlice = createSlice({
      name: ' sidebar',
      initialState: {
            isOpen: true,
      },
      reducers: {
            toggleSidebar: (state, action: PayloadAction<boolean>) => {
                  // default is true => sidebar open
                  if (action.payload) {
                        setWidthSidebar('1240px');
                  } else {
                        setWidthSidebar('1340px');
                  }
                  state.isOpen = action.payload;
            },
      },
});
export const { toggleSidebar } = SidebarSlice.actions;
