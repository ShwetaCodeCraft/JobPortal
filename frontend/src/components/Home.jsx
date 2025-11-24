import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import { CategoryCarousel } from '@/components/CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home
