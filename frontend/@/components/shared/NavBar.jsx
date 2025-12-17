/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_END_POINT } from '/@/utils/constant'
import { setUser } from '/@/redux/authslice'

function navBar() {

    const { user } = useSelector(store => store.auth)

    const dispatch = useDispatch()

    const navigate = useNavigate()



    const LogOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.responce.data.message)

        }
    }

    return (
        <div className='bg-white'>

            <div className='flex justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>J0b<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-2'>
                    <ul className='flex items-center gap-5'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>

                                </>
                            ) : (<>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                                  </>)
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline  " className="cursor-pointer">Login</Button></Link>
                                <Link to="/signup"> <Button className="cursor-pointer bg-[#6A38c2] hover:bg-[#551cb5]">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />

                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">

                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />

                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'> {user?.fullName}</h4>
                                            <p className='text-sm  text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col text-gray-600 my-2'>
                                         {user&&user.role==="student"&&(  
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">

                                           
                                            <User2></User2>
                                            <Button variant="link"><Link to="/profile">View Profile </Link></Button>
                                        </div> )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut></LogOut>
                                            <Button onClick={LogOutHandler} variant="link"> <Link>Logout</Link></Button>
                                        </div>


                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>

        </div>
    )
}

export default navBar
