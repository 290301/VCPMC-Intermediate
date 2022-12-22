import { UserType } from './../../types/User';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

type UserSliceProps = {
      data: UserType[];
      currentUser: UserType;
      isLoggedIn: boolean;
      statusRequest: 'pending' | 'fulfilled' | 'reject' | 'default';
};

const collectionRef = collection(db, 'users');

export const Login = createAsyncThunk(
      'user/login',
      async ({ userName, password }: { userName: string; password: string }) => {
            try {
                  const q = query(
                        collection(db, 'users'),
                        where('userName', '==', userName),
                        where('password', '==', password),
                  );
                  const querySnapshot = await getDocs(q);
                  return querySnapshot.docs.length > 0
                        ? { ...(querySnapshot.docs[0].data() as UserType), id: querySnapshot.docs[0].id }
                        : undefined;
            } catch (error) {
                  console.log(error);
            }
      },
);

export const Logout = createAsyncThunk('user/logout', async () => {
      return true;
});

export const UpdateUser = createAsyncThunk('user/update', async (data: UserType) => {
      try {
            const UserRef = doc(collectionRef, data.id);
            updateDoc(UserRef, data);
            return data;
      } catch (error) {
            console.log(error);
      }
});

export const UpdatePassword = createAsyncThunk(
      'user/updatePassword',
      async ({ idUser, newPassword }: { idUser: string; newPassword: string }) => {
            try {
                  const UserRef = doc(collectionRef, idUser);
                  updateDoc(UserRef, {
                        password: newPassword,
                  });
            } catch (error) {
                  console.log(error);
            }
      },
);

export const getDataUsers = createAsyncThunk('user/getUsers', async () => {
      try {
            const data: UserType[] = [];
            const queryData = query(collectionRef);
            const documentSnapshot = await getDocs(queryData);
            documentSnapshot.forEach((doc) => {
                  const obj: UserType = { ...(doc.data() as UserType), id: doc.id };
                  data.push(obj);
            });
            return data;
      } catch (error) {
            console.log(error);
      }
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
            // ----------------------Login
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
            // ----------------------Logout
            builder.addCase(Logout.fulfilled, (state) => {
                  state.isLoggedIn = false;
                  state.currentUser = {} as UserType;
            });
            // ----------------------Update user
            builder.addCase(UpdateUser.fulfilled, (state, action) => {
                  state.currentUser = action.meta.arg;
            });
            // ----------------------Update password
            builder.addCase(UpdatePassword.pending, (state) => {
                  state.statusRequest = 'pending';
            });
            builder.addCase(UpdatePassword.fulfilled, (state, action) => {
                  state.currentUser = { ...state.currentUser, password: action.meta.arg.newPassword };
                  state.statusRequest = 'fulfilled';
            });
            // ----------------------Get data users
            builder.addCase(getDataUsers.fulfilled, (state, action) => {
                  if (action.payload !== undefined) {
                        state.data = action.payload;
                  } else {
                        console.log('Error');
                  }
            });
      },
});
