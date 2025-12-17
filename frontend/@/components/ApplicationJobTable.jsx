import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function ApplicationJobTable() {
  const {allAppliedjob=[]}=useSelector(store=>store.job)

  console.log("alll apliedjob",allAppliedjob);
  
  return (
    <div>
      

      <Table>
        <TableCaption>A list of your applied  job</TableCaption>
        <TableHeader>
           <TableRow>
            <TableHead>Date</TableHead>
             <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
               <TableHead className="text-right">Status</TableHead>
           </TableRow>
            </TableHeader>
           <TableBody>
          

            {
                allAppliedjob.length<=0?<td colSpan={5} className='text-center'>You haven't applied any job yet</td> : allAppliedjob.map((item)=>(
                    <TableRow key={item._id}>

                        <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{item?.job.title}</TableCell>
                        <TableCell>{item?.job?.company?.name}</TableCell>
                        <TableCell className="text-right" ><Badge className={`${item.status=="rejected"?'bg-red-600':item.status==="pending"?'bg-gray-400':'bg-green-400'}`}>{item.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))
            }
        
           </TableBody>
          
      </Table>
    </div>
  )
}

export default ApplicationJobTable
