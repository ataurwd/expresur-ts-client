import { Helmet } from "react-helmet";
import NueCard1 from "../../components/Nuestros-component/NueCard1";
import NueHero from "../../components/Nuestros-component/NueHero";
import NueSub from "../../components/Nuestros-component/NueSub";
import NueTimeline from "../../components/Nuestros-component/NueTimeline";

const Nuestros = () => {
  return (
    <div>
      <Helmet><title> Nuestros |  EXPRESUR</title></Helmet>
      <NueHero />
      <div >
        
        <div className=" mb-10 md:mb-20"></div>
        <NueCard1 />
      </div>
      <NueTimeline />
    </div>
  );
};

export default Nuestros;
