import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interface';

export interface AppState {
  currentPage: string;
  user: User | null;
  showForm: boolean;
  editingMatch: any | null;
}

const initialState: AppState = {
  currentPage: "/dashboard",
  user: JSON.parse(localStorage.getItem("User") || "null"),
  showForm: false,
  editingMatch: null,
};

export const Slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    setEditingMatch: (state, action: PayloadAction<any | null>) => {
      state.editingMatch = action.payload;
    },
  },
});

export const { 
  setCurrentPage,
  setUser,
  setShowForm,
  setEditingMatch,
} = Slice.actions;

export default Slice.reducer;
