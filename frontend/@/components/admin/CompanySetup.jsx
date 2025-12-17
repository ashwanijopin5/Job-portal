import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, LogIn } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_END_POINT } from '/@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../hooks/useGetCompanyById'
function CompanySetup() {
  const params = useParams()
useGetCompanyById(params.id)

  
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null
  })

  const {singleCompany}=useSelector(store=>store.company)
  const [loading, setLoaADING] = useState(false)


  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changefileHandlwee = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      setLoaADING(true)
      const res = await axios.put(`${COMPANY_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data?.message)
        navigate("/admin/companies")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)

    } finally {
      setLoaADING(false)
    }


  }

  useEffect(() => {

    if(singleCompany){
    setInput(
      {
        name: singleCompany.name||'',
        description: singleCompany.description||'',
        website: singleCompany.website||'',
        location: singleCompany.location||'',
        file: singleCompany.file||null
      }
    )}
  },[singleCompany])
  return (
    <div>
      <NavBar />

      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft></ArrowLeft>
              <span>Back </span>

            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Comapny Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandeler}></Input>
            </div>


            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandeler}></Input>
            </div>


            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandeler}></Input>
            </div>


            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandeler}></Input>
            </div>



            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"

                onChange={changefileHandlwee}></Input>
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>

          }

        </form>


      </div>

    </div>
  )
}

export default CompanySetup
