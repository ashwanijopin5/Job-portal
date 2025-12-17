import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '/@/redux/jobSlice'



const filterData = [
    {
        filterType: "Location",
        arry: ["haryana", "Dehli", "Mumbai", "Punjab", "Rajasthan"]
    },
    {
        filterType: "Industry",
        arry: ["Frontend Devlpoer", " Backend Developer", "FullStack Developer", "MERN-Stack"]
    },
    {
        filterType: "Salary",
        arry: ["0-40k", "40k-90k", "90l-1lakh", "1Lakh-5Lakh"]
    },
]
function FilterCard() {
const [selectedValue,setSelectedValue]=useState('')
const dispatch=useDispatch()
const changeHandler=(value)=>{
    setSelectedValue(value)
}
useEffect(()=>{
   

    dispatch(setSearchQuery(selectedValue))
    
},[selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup  value={selectedValue} onValueChange={changeHandler}>

                {

                    filterData.map((item,index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{item.filterType}</h1>
                            {
                                item.arry.map((data,j) => {
                                    const uKy=index-j;
                                    return (
                                        <div key={j} className='flex items-center space-x-2 my-2' >
                                            <RadioGroupItem value={data} id={uKy} />
                                            <Label htmlFor={uKy} > {data}</Label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
