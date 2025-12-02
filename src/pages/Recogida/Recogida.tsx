import React from 'react';
import RecogidaHero from './RecogidaHero';
import PickupServiceCard from './PickupServiceCard';
import PickupForm from './PickupForm';
import RecoLogisticsTimeline from './RecoLogisticsTimeline';
import { Helmet } from 'react-helmet';


const Recogida = () => {
  return (
   <>
   <Helmet><title>Recogida |  EXPRESUR</title></Helmet>
   <RecogidaHero/>
   <PickupServiceCard/>
   <PickupForm/>
   <RecoLogisticsTimeline/>
   </>
  );
};

export default Recogida;