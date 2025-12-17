
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import SignUp from '/@/components/auths/SignUp'
import Login from '/@/components/auths/Login'
import Home from '/@/components/Home'
import Jobs from '/@/components/Jobs'
import JobsA from '/@/components/admin/JobsA'
import Browse from '/@/components/Browse'
import Profile from '/@/components/Profile'
import JobDescription from '/@/components/JobDescription'
import Companies from '/@/components/admin/Companies'
import CompanyCreate from '/@/components/admin/CompanyCreate'
import CompanySetup from '/@/components/admin/CompanySetup'
import PostJOb from '/@/components/admin/PostJOb'
import Applicants from '/@/components/admin/Applicants'
import ProtectedRoute from '/@/components/admin/protactedRoute'

const appRouter=createBrowserRouter([

  {
    path:"/",
    element:<Home />
  },
  
    {
    path:"/signup",
    element:<SignUp />
  },
    {
    path:"/login",
    element:<Login />
  },
   {
    path:"/jobs",
    element:<Jobs />
  },
    {
    path:"/description/:id",
    element:<JobDescription/>
  },
    {
    path:"/browse",
    element:<Browse />
  },
    {
    path:"/profile",
    element:<Profile />
  },
{
    path:"/admin/companies",
    element:<ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate />
  },
   {
    path:"/admin/companies/:id",
    element:<CompanySetup />
  },
   {
    path:"/admin/jobs",
    element:<JobsA />
  },
   {
    path:"/admin/jobs/create",
    element:<PostJOb />
  },
   {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants />
  },
])
function App() {
 

  return (
    <>
    <RouterProvider router={appRouter}/>
    
    </>
  )
}

export default App
