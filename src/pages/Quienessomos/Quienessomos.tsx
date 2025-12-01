import React from 'react'
import QuienesSomosBanner from '../../components/quienessomos/QuienesSomosBanner'
import Quedicen from '../../components/quienessomos/Quedicen'
//import PricingSection from '../../components/quienessomos/PricingSection'
import LogisticsTimeline from '../../components/quienessomos/LogisticsTimeline'
import TeamSection from '../../components/quienessomos/TeamSection'
import WhyChooseUs from '../../components/quienessomos/WhyChooseUs'
import { Helmet } from 'react-helmet'

const Quienessomos = () => {
  return (
    <>
    <Helmet><title>Quiénes Somos |  EXPRESUR</title></Helmet>
      <QuienesSomosBanner />
      <WhyChooseUs />
      {/* <PricingSection /> */}
      <TeamSection />
      <LogisticsTimeline />
      <Quedicen />
    </>
  )
}

export default Quienessomos