import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '/@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const dispatch=useDispatch()
  const [query,setQuery]=useState('')
  const navigate=useNavigate()
  console.log("hero section",query);
  

  const serachJobHandler=()=>{
  
    dispatch(setSearchQuery(query))
    navigate("/browse")

  }
  return (
    <div className='text-center'>

        <div className='flex flex-col gap-5 my-5'>
      <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No.1 Job Hunt Webite</span>
    <h1 className='text-5xl font-bold'>Search,Apply & <br/>Get YOUR<span className='text-[#6A38C2]'>Dream Job</span></h1>
    
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque modi, nemo vitae quidem obcaecati deleniti deserunt pariatur neque vero fugit suscipit laborum ipsa itaque eligendi necessitatibus, sunt natus harum minus!
!
    Quia dolorum reprehenderit numquam, ab dolore unde. Accusamus molestias, nobis blanditiis at ratione voluptatem ea suscipit dolorem eligendi, id soluta aperiam. Ipsum magnam </p>
   <div className='flex w-[40%]  shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>

<input 
type='text'
placeholder='find your deam job'
onChange={(e)=>setQuery(e.target.value)}
className='outline-none border-none w-full '/>
<Button onClick={serachJobHandler} className="rounded-r-full bg-[#6A38C2]">
    <Search className='h-5 w-5'/>
</Button>


   </div>
   
    </div>
    </div>
  )
}

export default HeroSection
