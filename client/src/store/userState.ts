import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/dataTypes';
import { apiCall } from '../utils/httpMethod';


export interface UserState {
  user: IUser | null;
}
interface UserPlayload{
    user:IUser
}

const initialState: UserState  = {
  user:null
}

export const updateUser = createAsyncThunk('users/updateUser',async ()=>{
  const response = await apiCall('GET','verify');
  
  if(response.success){
    return response.data;
  }
  else{
    return null;
  }
  
})

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
  extraReducers(builder) {
    builder.addCase(updateUser.fulfilled,(state,action)=>{
      if(action.payload){
        state.user = action.payload;
      }
    })
  },
})


export const userActions = userSlice.actions

export default userSlice;