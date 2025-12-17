import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import axios from 'axios'
import { COMPANY_END_POINT } from '/@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSinglecompany } from '/@/redux/companySlice'
function CompanyCreate() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [companyName,setCompanyName]=useState()
    const RegisterNewCompany=async () => {
        try {
            const res=await axios.post(`${COMPANY_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            })
            if(res?.data?.success){

                dispatch(setSinglecompany(res.data.company))
                toast.success(res.data.message)
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    }
    
    return (
        
        <div>
            <NavBar></NavBar>
            <div className="max-w-4xl mx-auto">
                <div>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company Name</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JObHunt, microsioft etc."
                    onChange={(e)=>setCompanyName(e.target.value)}
                />

                <div className="flex items-center gap-2 my-10">

                    <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={RegisterNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
