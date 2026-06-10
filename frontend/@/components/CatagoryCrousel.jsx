import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '/@/redux/jobSlice'

function CatagoryCrousel() {

    const catagory = [
        "Frontend Developer",
        "Backend Developer",
        "MERN-Stack",
        "Full-Stack",
        "Data Analyst    ",
        "Graphic Designer"
    ]


      const dispatch=useDispatch()
 
  const navigate=useNavigate()


  const serchJobHandler=(query)=>{
    console.log("catagry carousel",query);
    
    dispatch(setSearchQuery(query))

    navigate("/browse")}
    return (
        <div>

            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>


                    {
                        catagory.map((catagory, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">

                                <Button onClick={()=>serchJobHandler(catagory)} variant="outline" className="rounded-full">{catagory}</Button>

                            </CarouselItem>

                        ))
                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CatagoryCrousel
