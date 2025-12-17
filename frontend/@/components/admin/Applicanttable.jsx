import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_END_POINT } from '/@/utils/constant'

function Applicanttable() {
    const { applicants } = useSelector(store => store.application)
    const shortListingStatus = ["accepted", "rejected"]

    const statushandler=async(status,id)=>{
        try {
            axios.defaults.withCredentials=true
            const res=await axios.post(`${APPLICATION_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
      
       
            if(res.data.success){
toast.success(res.data.message)
       }

        } catch (error) {
            toast.error(error.reponse.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recnt applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>

                </TableHeader>


                <TableBody>
                    {
                        applicants && applicants?.map((item) => {
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{item.applicant.fullName}</TableCell>
                                    <TableCell>{item.applicant.email}</TableCell>
                                    <TableCell>{item.applicant.phoneNumber}</TableCell>
                                    <TableCell className="text-blue-600 cursor-pointer">

                                        {
                                            item?.applicant?.profile?.resume ?

                                                <a href={item?.applicant?.profile?.resume} target='_blank' rel="noopener noreferrer">{item.applicant.profile.resumeOriginalName}</a> : <span>NA</span>
                                        }
                                    </TableCell>

                                    <TableCell>

                                        {item?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">

                                                {
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={()=>statushandler(status,item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>
                                                                    {status}
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>

                                    </TableCell>
                                </TableRow>

                            )
                        })
                    }


                </TableBody>

            </Table>

        </div>
    )
}

export default Applicanttable
