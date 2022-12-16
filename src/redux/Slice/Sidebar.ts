import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// function setWidthSidebar(newWidth: string) {
//       document.documentElement.style.setProperty('--width-table-content', newWidth);
// }
type SidebarProps = {
      type: 'block' | 'fixed';
      isOpen: boolean;
};
export const SidebarSlice = createSlice({
      name: 'sidebar',
      initialState: {
            type: 'block',
            isOpen: false,
      } as SidebarProps,
      reducers: {
            toggleSidebar: (state, action: PayloadAction<SidebarProps>) => {
                  state = { ...action.payload };
            },
      },
});
export const { toggleSidebar } = SidebarSlice.actions;
