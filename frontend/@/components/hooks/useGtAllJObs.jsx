import { setAllJobs } from '/@/redux/jobSlice';
import { job_END_POINT } from '/@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGtAllJObs() {

    const dispatch=useDispatch();
    const {searchQuery}=useSelector(store=>store.job)
  useEffect(()=>{
    const fetchAllJObs=async () => {
        try {
            const res=await axios.get(`${job_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true});
            console.log("all job",res.data)
            
            if(res.data.success){
                
                 dispatch(setAllJobs(res.data.jobs))
            }



        } catch (error) {
            console.log(error);
            
        }
    }

    fetchAllJObs()
  },[dispatch,searchQuery])
}

export default useGtAllJObs
