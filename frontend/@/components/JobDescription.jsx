import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { job_END_POINT } from '/@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSinglejob } from '/@/redux/jobSlice'
import { APPLICATION_END_POINT } from '/@/utils/constant'
import { toast } from 'sonner'


function JobDescription() {

   



    const params=useParams();
    const jobId=params.id;
    
    
    const dispatch=useDispatch()

    const {singleJob}=useSelector(store=>store.job)
  
    const {user}=useSelector(store=>store.auth)


     const IsInitiallyApplied = singleJob?.applications?.some(application=>application.applicant==user?._id)||false;
  const [IsApplied,setIsApplied]=useState(IsInitiallyApplied)


     const applyJobhandler=async () => {
    try {
        
        const res= await  axios.get(`${APPLICATION_END_POINT}/apply/${jobId}`,{withCredentials:true})
        if(res.data.success){
            setIsApplied(true);
            const updateSingleJoib={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
          dispatch(setSinglejob(updateSingleJoib))//helps us to real time ui time
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        
    }
}
     useEffect(()=>{
      
        
    const fetchsingleJOb=async () => {
        try {
            const res=await axios.get(`${job_END_POINT}/get/${jobId}`,{withCredentials:true});
            if(res.data.success){
              
                
                 dispatch(setSinglejob(res.data.job))
                 setIsApplied(res.data.job.applications.some(application=>application.applicant==user?._id))
            }



        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    }

    fetchsingleJOb()
  },[jobId,dispatch,user?._id])
  
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 my-4 '>
                        <Badge className="text-blue-700 font-bold " variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className="text-[#f83002] font-bold " variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209B7] font-bold " variant="ghost">{singleJob?.salary}LpA</Badge>
                    </div>
                </div>
                <Button
                
                onClick={IsApplied?null:applyJobhandler}
                disabled={IsApplied}
                    className={`rounded-lg ${IsApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209B7] hover:bg-[#5F32ad]"}`}>
                    {IsApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>

                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>

                <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length||0}</span></h1>
                <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?singleJob?.createdAt.split("T")[0]:"N/A"}</span></h1>

            </div>


        </div>
    )
}

export default JobDescription
