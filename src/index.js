import React, {Suspense, useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import AuthRouter from "./components/AuthRouter";
import Skeleton from "./components/skeleton";
import router from "./routes/root";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Suspense fallback={ <Skeleton />}>
            <Provider store={store}>
                <RouterProvider  router={router}>
                <App/>
                </RouterProvider>
            </Provider>
        </Suspense>
    </React.StrictMode>
);
