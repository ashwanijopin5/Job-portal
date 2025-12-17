import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_END_POINT } from '/@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '/@/redux/authslice'
import { Loader2 } from 'lucide-react'


function SignUp() {


const navigate=useNavigate()

const dispatch=useDispatch()
    const [input,setinput]=useState({
            fullName:"",
               email:"",
               phoneNumber:"",
               password:"",
               role:"",
               file:""
        })
    
    const {loading,user}=useSelector(store=>store.auth)


        const changeeventHandler=
        (e)=>{
            setinput({...input,[e.target.name]:e.target.value})
        }
    
        const fileChangehandler=(e)=>{
            setinput({...input,file:e.target.files?.[0]})
        }


        const submitHandler=async (e) => {
        e.preventDefault();
        const formData=new FormData()

        formData.append("fullName",input.fullName)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("password",input.password)
        formData.append("role",input.role)

        if(input.file){
            formData.append("file",input.file)
        }
       try {

        dispatch(setLoading(true))
         const res=await axios.post(`${USER_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

        if(res.data.success){
            navigate("/login")
            toast.success(res.data.message)

        }
       } catch (error) {

        
        console.log(error);
        toast.error(error.response?.data?.message)
       }finally{
        dispatch(setLoading(false))
       }
        }

          useEffect(()=>{
                    if(user){
                        navigate('/')
                    }
                },[])
    return (
        <div>
            <NavBar />
            <div className='flex items-center justify-center max-w-6xl mx-auto'>
                <form onSubmit={submitHandler}  className='w-1/2 border border-gray-200 rounded-md p-4  my-10'>
                    <h1 className='font-bold text-xl mb-5'> SignUp</h1>

                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input

                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeeventHandler}
                            placeholder="yaar" />
                    </div>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input

                            type="email"
                        name="email"
                        value={input.email}
                        onChange={changeeventHandler}
                            placeholder="yaar@gmail.com" />
                    </div>


                    <div className="my-2">
                        <Label>PhoneNumber</Label>
                        <Input
                       
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeeventHandler}
                            placeholder="yaar" />
                    </div>


                    <div className="my-2">
                        <Label>Password</Label>
                        <Input

                            type="password"
                            name="password"
                            value={input.password}
                            autoComplete="new-password"
                            onChange={changeeventHandler}
                            placeholder="...." />
                    </div>
                    <div className="flex items-center justify-between">

                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center gap-3">
                                <Input
                                    type="radio"
                                    name='role'
                                    value="student"
                                    checked={input.role=="student"}
                                    onChange={changeeventHandler}
                                    className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="radio"
                                    name='role'
                                    value="recruiter"
                                    checked={input.role=="recruiter"}
                                    onChange={changeeventHandler}
                                    className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>
                             <div className="flex items gap-2">

                                <Label>Profile</Label>
                                <Input
                                accept="image/*"
                                type="file"
                                onChange={fileChangehandler}
                                className="cursor-pointer"/>
                             </div>
                    </div>

                  
                  {   
    loading?<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait </Button>:  <Button type="submit" className="w-full my-4">SignUp</Button>

}
                
               <span className='text-sm'>Already have an account?<Link to="/login" className='text-blue-600'>Login</Link></span> 
                </form>

            </div>
        </div>
    )
}

export default SignUp
