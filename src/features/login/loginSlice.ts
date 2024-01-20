import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/store/store";

// Define a type for the slice state
interface CounterState {
    password: String;
    username: String;
    status: {
        avatarPath?: String;
        hospitalId: string;
        depart: string;
        hospitalName: string;
        hospitalLevel: string;
        province: string;
        hospitalAddress: string;
        userId: string
    };
}

// Define the initial state using that type
const initialState: CounterState = {
    username: "1",
    password: "1",
    status: {
        avatarPath: "",
        hospitalId: "sc0001",
        depart: "外科",
        hospitalName: "乐山市第一人民医院",
        hospitalLevel: "三甲医院",
        province: "四川",
        hospitalAddress: "四川省乐山市犍为县",
        userId: "doc0001"
    },
};

export const counterSlice = createSlice({
    name: "login",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAvatar: (state, action) => {
            state.status.avatarPath = action.payload;
        },
        setUser(state, action) {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        setStatus(state, action) {
            state.status = {...action.payload};
        },
    },
});

export const {setAvatar, setUser, setStatus} = counterSlice.actions;

export default counterSlice.reducer;
