import { avatar } from "./../../components/patientInfo/css";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
interface CounterState {
  avatar: String;
  username: String;
  password: String;
}

// Define the initial state using that type
const initialState: CounterState = {
  avatar: "",
  username: "",
  password: "",
};

export const counterSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { setAvatar, setUser } = counterSlice.actions;

export default counterSlice.reducer;
