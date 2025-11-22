import React from 'react';
import HeroOne from './HeroOne';
import Seccion from './Seccion';
import FAQ from './FAQ';

import Quedicen from './Quedicen';
import Newone from './Newone';
import LogisticsTimeline from './LogisticsTimeline';
import Nuestros from './Nuestros';
import Rastrear from './Rastrear';

const Home = () => {
    return (
        <>
         <HeroOne/>
         <Nuestros/>
         <Rastrear/>


        <Seccion/>
        <FAQ/>
        <Newone/>
        <Quedicen/>
        <LogisticsTimeline/>
</>
    );
};

export default Home;