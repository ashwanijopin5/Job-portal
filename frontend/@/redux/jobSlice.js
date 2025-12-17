import { createSlice } from "@reduxjs/toolkit";


const jobSlice=createSlice({
    name:'job',
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        serchJobByText:"",
        allAppliedjob:[],
        searchQuery:''

    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSinglejob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setSerchJobByText:(state,action)=>{
            state.serchJobByText=action.payload;
        },
        setAllAplliedJob:(state,action)=>{
            state.allAppliedjob=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        }
    }
});

export const {setAllJobs,setSinglejob,setAllAdminJobs,setSerchJobByText,setAllAplliedJob,setSearchQuery}=jobSlice.actions;
export default jobSlice.reducer;