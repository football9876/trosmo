import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interface';

export interface AppState {
currentPage:string,
user:User|null,
showForm:boolean
}

const initialState: AppState = {
currentPage:"/dashboard",
user:JSON.parse(localStorage.getItem("User")||"null"),
showForm:false
};

export const Slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Reducer to set the screen state
   setCurrentPage:(state,action:PayloadAction<string>)=>{
    state.currentPage=action.payload
   },
   setUser:(state,action:PayloadAction<User | null>)=>{
    state.user=action.payload;
   },
setShowForm:(state,action:PayloadAction<boolean>)=>{
  state.showForm=action.payload
}


  },
});

export const { 
 setCurrentPage,
 setUser,
 setShowForm
} = Slice.actions;

export default Slice.reducer;
