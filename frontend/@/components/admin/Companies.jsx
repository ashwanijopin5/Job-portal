import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '/@/redux/companySlice'
function Companies() {
    const navigate=useNavigate()
    useGetAllCompanies()
const dispatch=useDispatch()
    const [input,setInput]=useState("");
    useEffect(()=>{
 dispatch( searchCompanyByText(input))
    },[input])

    return (
        <div>
            <NavBar />
            <div className="max-w-6xl mx-auto my-10">
                <div className='flex items-center justify-between my-5 '>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name' 
                        onChange={(e)=>setInput(e.target.value)}/>
                    <Button onClick={()=>navigate("/admin/companies/create")}>New Jobs</Button>
                </div>
         

            </div>
               <CompaniesTable/>
        </div>
    )
}

export default Companies
