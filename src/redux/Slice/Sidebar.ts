import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarProps = {
      type: 'block' | 'fixed';
      isOpen: boolean;
};

export const toggleSidebar = createAsyncThunk('sidebar/status', async (data: SidebarProps) => {
      try {
            return data;
      } catch (error) {
            console.log(error);
      }
});
export const SidebarSlice = createSlice({
      name: 'sidebar',
      initialState: {
            type: 'block',
            isOpen: false,
      } as SidebarProps,
      reducers: {
            // toggleSidebar: (state, action: PayloadAction<SidebarProps>) => {
            //       console.log(action.payload);
            //       state = { ...action.payload };
            //       console.log(state);
            // },
      },
      extraReducers: (builder) => {
            builder.addCase(toggleSidebar.fulfilled, (state, action) => {
                  state.isOpen = action.meta.arg.isOpen;
                  state.type = action.meta.arg.type;
            });
      },
});
// export const { toggleSidebar } = SidebarSlice.actions;
