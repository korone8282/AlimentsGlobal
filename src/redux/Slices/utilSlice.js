import { createSlice} from "@reduxjs/toolkit";

const initialState =  localStorage.getItem("utilData") ? JSON.parse(localStorage.getItem("utilData")) : 
{
BoilerRh:"",
BoilerCN:"",
BoilerSD:"",
BoilerAD:"",
BoilerBD:"",
BoilerR:"",
Cylinder:"",
RoRh:"",
RoCN:"",
RoSD:"",
RoAD:"",
RoBD:"",
RoR:"",
EtpRh:"",
EtpCN:"",
EtpSD:"",
EtpAD:"",
EtpBD:"",
EtpR:"",
DGRh:"",
Diesel:""
};

const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        setUtil: (state,action) => {
          return{
            ...state,
            [action.payload.name]:action.payload.val,
          } 
          
        },
        
        setStorage: (state,action) => {
          localStorage.setItem("utilData",JSON.stringify(state));
         },

        emptyUtil: (state,action) => {
         return{
          ...state,
          BoilerRh:"",
          BoilerCN:"",
          BoilerSD:"",
          BoilerAD:"",
          BoilerBD:"",
          BoilerR:"",
          Cylinder:"",
          RoRh:"",
          RoCN:"",
          RoSD:"",
          RoAD:"",
          RoBD:"",
          RoR:"",
          EtpRh:"",
          EtpCN:"",
          EtpSD:"",
          EtpAD:"",
          EtpBD:"",
          EtpR:"",
          DGRh:"",
          Diesel:""
          };
        },
    }
});

export const {setUtil,setStorage,emptyUtil} = utilSlice.actions;
export default utilSlice.reducer;
