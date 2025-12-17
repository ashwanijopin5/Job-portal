import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import Job from "./job"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '/@/redux/jobSlice'
import useGtAllJObs from './hooks/useGtAllJObs'


function Browse() {
  useGtAllJObs()
  const { allJobs = [] } = useSelector(store => store.job)
  // console.log("allJobs in browse", allJobs);

  const dispatch = useDispatch()
  //use effect is used gto clean up the serch after you leve browse
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(''))
      console.log("dispatch of browse");

    }
  })
  return (
    <div className='text-left'>
      <NavBar />

      <div>

        <div className='max-w-7xl mx-auto my-10'>
          <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>

          <div className="grid grid-cols-3 gap-4">

            {
              allJobs.map((job) => {
                return (
                  <Job key={job._id} job={job} />
                )
              })
            }</div>
        </div>
      </div>
    </div>
  )
}

export default Browse
