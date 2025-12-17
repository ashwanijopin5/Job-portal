
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminJobsTable() {
    
const {allAdminJobs,serchJobByText}=useSelector(store=>store.job  || [])


    const [filterJobs, setFilterjobs] = useState(allAdminJobs)
    const navigate = useNavigate()
    useEffect(() => {
        const filterdJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!serchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(serchJobByText.toLowerCase())|| job?.company?.name?.toLowerCase().includes(serchJobByText.toLowerCase())



        })
        setFilterjobs(filterdJob)
    }, [allAdminJobs, serchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>List of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        filterJobs?.map((job) => (



                            <TableRow >

                                <TableCell>{job?.company?.name}</TableCell>
                                 <TableCell>{job?.title}</TableCell>

                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal></MoreHorizontal></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div  onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}className='flex mt-2 items-center gap-2 w-fit cursor-pointer'>
                                                <Eye className='w-4'/>
                                                <span>Applicant</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>


                        )
                        )
                    }
                </TableBody>

            </Table>
        </div>
    )
}

export default AdminJobsTable
