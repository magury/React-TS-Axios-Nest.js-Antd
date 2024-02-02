import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/store/store";

// Define a type for the slice state
interface LoginState {
    doth: {
        password: string;
        username: string;
        avatarPath?: string;
        hospitalId: string;
        depart: string;
        hospitalName: string;
        hospitalLevel: string;
        province: string;
        hospitalAddress: string;
        userId: string;
        author: string;
    };
}

const init = (key: string) => {
    const previous = localStorage.getItem('expired') ?? false
    if (previous == false) return ''
    const current = Date.now()
    if (parseInt(previous) > current) {
        return localStorage.getItem(key) ?? ''
    }
    else
        localStorage.clear()
    return ''
}
// Define the initial state using that type
const initialState: LoginState = {
    doth: {
        username: init('username'),
        password: init('password'),
        avatarPath: init('avatarPath'),
        hospitalId: init('hospitalId'),
        depart: init('depart'),
        hospitalName: init('hospitalName'),
        hospitalLevel: init('hospitalLevel'),
        province: init('province'),
        hospitalAddress: init('hospitalAddress'),
        userId: init('userId'),
        author: init('author'),
    },
};

export const counterSlice = createSlice({
    name: "login",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStatus(state, action) {
            state.doth = {...state.doth, ...action.payload};
            const next = Date.now() + 3 * 24 * 60 * 60 * 1000
            localStorage.setItem('expired', next.toString())
            const map = Object.entries(state.doth)
            for (let item of map)
                localStorage.setItem(item[0], item[1])

        },
    },
});

export const {setStatus} = counterSlice.actions;

export default counterSlice.reducer;
