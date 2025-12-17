import { setAllAplliedJob } from '/@/redux/jobSlice'
import { APPLICATION_END_POINT } from '/@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function uaseGetAplledJob() {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch()
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
    const fetchAppliedJob=async ()=>{
        try {
            const res=await axios.get(`${APPLICATION_END_POINT}/get`,{withCredentials:true})
      
        
            if(res.data.success){
                console.log("fetchApplyJob",res.data);
                
            dispatch(setAllAplliedJob(res.data.application))
        }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAppliedJob()
},[dispatch])
 
}

export default uaseGetAplledJob
