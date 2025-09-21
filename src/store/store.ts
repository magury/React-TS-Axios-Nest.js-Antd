import {configureStore} from "@reduxjs/toolkit";
// ...
import LoginReducer from "@/features/login/loginSlice";
import HospitalReducer from '@/features/hospital/hospitalSlice'
import AdminReducer from "@/features/admin/adminSlice";

const store = configureStore({
    reducer: {
        login: LoginReducer,
        hospital: HospitalReducer,
        admin:AdminReducer
    },
});
export default store;
// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
