import React, { useEffect, useState } from 'react'
import NavBar from './shared/NavBar'
import FilterCard from './FilterCard'
import Job from './job'
import { useSelector } from 'react-redux'
import useGtAllJObs from './hooks/useGtAllJObs'
// import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

function Jobs() {

    useGtAllJObs();
    const{allJobs,serchQuery}=useSelector(store=>store.job)

    console.log("allobs in Jobs.jsx",allJobs);
    
  const [filterJob,setFilterJob]=useState(allJobs)
  useEffect(()=>{
if(serchQuery){
const filterdJob=allJobs.filter((job)=>{

    console.log("filterd,job inn Jobs.jsx",job);
    console.log("Jobs.jsx queary",serchQuery);
    
    
    return job.title.toLowerCase().includes(serchQuery.toLowerCase())||
    job.description.toLowerCase().includes(serchQuery.toLowerCase())||
    job.location.toLowerCase().includes(serchQuery.toLowerCase())
    
})
setFilterJob(filterdJob)
}else{
    setFilterJob(allJobs)
}
  },[allJobs,serchQuery])
  
    
    return (
        <div>
            <NavBar />

            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>

                    <div className="w-20%">

                        <FilterCard />
                    </div>
                    {filterJob.length <= 0 ? <span>Job not found</span> : (

                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className="grid grid-cols-3 gap-4">



                                {allJobs.map((job) =>

                                    <motion.div 
                                    initial={{opacity:0,x:100}}
                                    animate={{opacity:1,x:0}}
                                    exit={{opacity:0,x:-100}}
                                    transition={{duration:0.3}}
                                    key={job._id} >
                                        <Job  job={job} /> </motion.div>)}
                            </div>

                        </div>)
                    }
                </div>
            </div>




        </div>
    )
}

export default Jobs
