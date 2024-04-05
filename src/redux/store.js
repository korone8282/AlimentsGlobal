import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./Slices/authSlice";
import dataReducer from "./Slices/dateSlice";
import localReducer from "./Slices/localSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        data: dataReducer,
        local: localReducer
    }
});


export default store;