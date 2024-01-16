import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

// Define a type for the slice state
interface CounterState {
  password: String;
  username: String;
  status: {
    picturePath?: String;
    hospitalId: string;
    depart: string;
    hospitalName: string;
    hospitalLevel: string;
    province: string;
    hospitalAddress: string;
  };
}

// Define the initial state using that type
const initialState: CounterState = {
  username: "1",
  password: "1",
  status: {
    picturePath: "",
    hospitalId: "sc0001",
    depart: "外科",
    hospitalName: "乐山市第一人民医院",
    hospitalLevel: "三甲医院",
    province: "四川",
    hospitalAddress: "四川省乐山市犍为县",
  },
};

export const counterSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.status.picturePath = action.payload;
    },
    setUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setStatus(state, action) {
      state.status = { ...action.payload };
    },
  },
});

export const { setAvatar, setUser, setStatus } = counterSlice.actions;

export default counterSlice.reducer;
