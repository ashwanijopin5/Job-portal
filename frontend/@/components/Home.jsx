import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import CatagoryCrousel from './CatagoryCrousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGtAllJObs from './hooks/useGtAllJObs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Home() {

  useGtAllJObs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role == 'recruiter') {
      navigate("/admin/companies")
    }
  }, [])
  return (
    <div>
      <NavBar />
      <HeroSection />
      <CatagoryCrousel />
      <LatestJob />
      <Footer />
    </div>
  )
}

export default Home
