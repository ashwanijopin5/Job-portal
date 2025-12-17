import { COMPANY_END_POINT } from '/@/utils/constant';

import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setSinglecompany } from '/@/redux/companySlice';

function useGetCompanyById(companyId) {

    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchSingleCompany=async () => {
        try {
            const res=await axios.get(`${COMPANY_END_POINT}/get/${companyId}`,{withCredentials:true});
            if(res.data.success){
                
                 dispatch(setSinglecompany(res.data.company))
            }



        } catch (error) {
            console.log(error);
            
        }
    }

    fetchSingleCompany()
  },[companyId,dispatch])
}

export default useGetCompanyById
