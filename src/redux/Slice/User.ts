import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserType } from '../../types/Account';

type UserSliceProps = {
      data: UserType[];
      currentUser: UserType;
      isLoggedIn: boolean;
      statusRequest: 'pending' | 'fulfilled' | 'reject' | 'default';
};

export const Login = createAsyncThunk(
      'user/login',
      async ({ userName, password }: { userName: string; password: string }) => {
            try {
                  const q = query(
                        collection(db, 'accounts'),
                        where('userName', '==', userName),
                        where('password', '==', password),
                  );
                  const querySnapshot = await getDocs(q);
                  return querySnapshot ? (querySnapshot.docs[0].data() as UserType) : undefined;
            } catch (error) {
                  console.log(error);
            }
      },
);

export const Logout = createAsyncThunk('user/logout', async () => {
      return true;
});

export const UserSlice = createSlice({
      name: ' user',
      initialState: {
            data: [],
            currentUser: {} as UserType,
            isLoggedIn: false,
            statusRequest: 'default',
      } as UserSliceProps,
      reducers: {},
      extraReducers: (builder) => {
            builder.addCase(Login.pending, (state) => {
                  state.statusRequest = 'pending';
            });
            builder.addCase(Login.fulfilled, (state, action) => {
                  if (action.payload === undefined) {
                        state.isLoggedIn = false;
                        state.statusRequest = 'reject';
                  } else {
                        state.currentUser = { ...action.payload };
                        state.isLoggedIn = true;
                        state.statusRequest = 'fulfilled';
                  }
            });
            builder.addCase(Login.rejected, (state) => {
                  state.statusRequest = 'reject';
                  state.isLoggedIn = false;
            });
            builder.addCase(Logout.fulfilled, (state) => {
                  state.isLoggedIn = false;
                  state.currentUser = {} as UserType;
            });
      },
});
