import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/dataTypes';


export interface UserState {
  user: IUser | null;
}
interface UserPlayload{
    user:IUser
}

const initialState: UserState  = {
  user:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action: PayloadAction<UserPlayload>) => {
      
      state.user = action.payload.user;
    },
    removeState: (state) => {
      state.user = null;
    },
  },
})


export const userActions = userSlice.actions

export default userSlice;