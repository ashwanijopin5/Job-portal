import React, { useState } from 'react'
import NavBar from './shared/NavBar'

import { AvatarImage, Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Contact2, Mail, Pen, PhoneCall, PhoneCallIcon } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import ApplicationJobTable from './ApplicationJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import uaseGetAplledJob from './hooks/uaseGetAplledJob'


function Profile() {
   uaseGetAplledJob()

    const[open,setOpen]=useState(false)
    const {user}=useSelector(store=>store.auth)




    const isResume=true
    return (
        <div>
            <NavBar />
            <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />

                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio} </p>
                        </div></div>
                    <Button onClick={()=>setOpen(true)} variant="outline" className="text-right"><Pen /></Button>

                </div>




                <div className='my-5'>
                    <div className="flex items-center gap-4 my-2">
                        <Mail />
                        <span>{user?.email}</span>

                    </div>
                    <div className="flex items-center gap-4 my-2">

                        <PhoneCallIcon />
                        <span>{user?.phoneNumber}</span>
                    </div>


                </div>



                <div className='my-5'>
                    <h1>Skills</h1>

                    <div className="flex items-center gap-1">
                    { user?.profile?.skills.length!=0?  user?.profile?.skills.map((item,index)=> <Badge key={index}>{item}</Badge>):<span>NA</span>}
                    </div>
                </div>


                <div className="grid w-full max-w-sm items-center gap-1.5">


                    <Label className="text-md font-bold">Resume</Label>
          {
             isResume?<a target='blank' href={user?.profile?.resume}  className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
          }

                </div>

               
            </div>

             <div className="max-w-4xl mx-auto bg-white rounded-2xl">

                    <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                    <ApplicationJobTable/>
                </div>

                <UpdateProfile open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
