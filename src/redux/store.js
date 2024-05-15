import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./Slices/authSlice";
import dataReducer from "./Slices/dateSlice";
import localReducer from "./Slices/localSlice";
import utilReducer from "./Slices/utilSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        data: dataReducer,
        local: localReducer,
        util: utilReducer,
    },

});


export default store;