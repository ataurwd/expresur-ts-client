import React from 'react'
import QuienesSomosBanner from '../../components/quienessomos/QuienesSomosBanner'
import Quedicen from '../../components/quienessomos/Quedicen'
import PricingSection from '../../components/quienessomos/PricingSection'
import LogisticsTimeline from '../../components/quienessomos/LogisticsTimeline'


const Quienessomos = () => {
  return (
    <>
      <QuienesSomosBanner />
      <PricingSection />
      <LogisticsTimeline />
      <Quedicen />
    </>
  )
}

export default Quienessomos