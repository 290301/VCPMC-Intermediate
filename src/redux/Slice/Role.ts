import { RoleType } from './../../types/Role';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

type RoleSliceProps = {
      data: RoleType[];
      statusRequest: 'pending' | 'fulfilled' | 'reject' | 'default';
};

const collectionRef = collection(db, 'roles');

export const getDataRoles = createAsyncThunk('roles/getRoles', async () => {
      try {
            const data: RoleType[] = [];
            const queryData = query(collectionRef);
            const documentSnapshot = await getDocs(queryData);
            documentSnapshot.forEach((doc) => {
                  const obj: RoleType = { ...(doc.data() as RoleType), roleID: doc.id };
                  data.push(obj);
            });
            return data;
      } catch (error) {
            console.log(error);
      }
});

export const RoleSlice = createSlice({
      name: ' roles',
      initialState: {
            data: [],
            statusRequest: 'default',
      } as RoleSliceProps,
      reducers: {},
      extraReducers: (builder) => {
            builder.addCase(getDataRoles.fulfilled, (state, action) => {
                  state.data = action.payload!;
            });
      },
});
