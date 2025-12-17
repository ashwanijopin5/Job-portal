import React, { useEffect } from 'react'
import NavBar from '../shared/NavBar'
import Applicanttable from './Applicanttable'
import axios from 'axios'
import { APPLICATION_END_POINT } from '/@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '/@/redux/applicationslice'
function Applicants() {
const params=useParams()
const dispatch=useDispatch()
const {applicants=[]}=useSelector(store=>store.application)


  useEffect(()=>{
    const fetchAllApllicants=async()=>{
      try {
        const res= await axios.get(`${APPLICATION_END_POINT}/${params.id}/applicant`,{withCredentials:true})
     
      
     
      
        
        dispatch(setAllApplicants(res.data.job.applications||[]))
      
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllApllicants()
  },[])
  return (
    <div>
      <NavBar/>
      <div className="max-w-7xl mx-auto">
        <h1 className='font-bold text-xl my-5'>Applicants {applicants.length}</h1>
        <Applicanttable/>
      </div>
    </div>
  )
}

export default Applicants
