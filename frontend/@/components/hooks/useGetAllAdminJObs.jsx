import { setAllAdminJobs } from '/@/redux/jobSlice';

import { job_END_POINT } from '/@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllAdminJObs() {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJObs = async () => {
      try {
        const res = await axios.get(`${job_END_POINT}/getadminjobs`, { withCredentials: true });
        if (res.data.success) {
          // console.log("all job",res.data)
          dispatch(setAllAdminJobs(res.data.jobs))
        }



      } catch (error) {
        console.log(error);

      }
    }

    fetchAllJObs()
  }, [dispatch])
}

export default useGetAllAdminJObs
