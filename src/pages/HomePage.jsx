import React from 'react'
import HeroSlider from '../components/Home/HeroSlider'
import Solution from '../components/Home/Solution'
import WhyUs from '../components/Home/WhyUs'
import Testimonial from '../components/Home/Testimonial'
import CTA from '../components/Home/CTA'

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <Solution />
      <WhyUs />
      <Testimonial />
      <CTA />
    </div>
  )
}

export default HomePage
