import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/store/store";

// Define a type for the slice state
interface AdminState {
    doth: {
        auth: boolean
    }
}

const init = (key: string): boolean => {
    const previous = localStorage.getItem('expired') ?? false
    if (previous == false) return false
    const current = Date.now()
    if (parseInt(previous) > current) {
        return Boolean(localStorage.getItem(key)) ?? false
    } else
        localStorage.clear()
    return false
}
// Define the initial state using that type
const initialState: AdminState = {
    doth: {
        auth: init('auth')
    }
};

export const adminSlice = createSlice({
    name: "admin",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuth(state, action) {
            state.doth.auth = action.payload
            const next = Date.now() + 3 * 24 * 60 * 60 * 1000
            localStorage.setItem('expired', next.toString())
            localStorage.setItem('auth', action.payload.toString())
        }
    },
});

export const {setAuth} = adminSlice.actions;

export default adminSlice.reducer;
