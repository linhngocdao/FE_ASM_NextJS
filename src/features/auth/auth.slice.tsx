import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";


type AuthState = {
  isLogged: boolean;
  currentUser: IUser | {};
};

const initialState: AuthState = {
  isLogged: false,
  currentUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, { payload }) {
      state.isLogged = true;
      state.currentUser = payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    signout(state) {
      state.isLogged = false;
      state.currentUser = {};
      localStorage.removeItem("user");
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;