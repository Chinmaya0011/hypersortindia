import React from 'react';
import Filter from '../Components/Filter';
import style from '../style/home.module.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import Pending from '../Components/Pending';
import InProgress from '../Components/InProgress';
import Completed from '../Components/Completed';
import Deployed from '../Components/Deployed';
import Deffred from '../Components/Deffered';
const Home = () => {
  // Create a ref for the Flickity component
  const flickityRef = React.useRef(null);

  React.useEffect(() => {
    // Initialize Flickity when the component mounts
    if (flickityRef.current) {
      new Flickity(flickityRef.current, {
        // Flickity options
        // You can configure Flickity as needed here
        // For example, set "wrapAround" to true for infinite scrolling
        wrapAround: true,
      });
    }
  }, []);

  return (
    <div className={style.home}>
      <Filter />
     
   
      <div className={style.tasks} ref={flickityRef}>
        <div className="carousel-cell">
          <Pending />
        </div>
        <div className="carousel-cell">
          <InProgress />
        </div>
        <div className="carousel-cell">
          <Completed />
        </div>
        <div className="carousel-cell">
          <Deployed />
        </div>
        <div className="carousel-cell">
          <Deffred />
        </div>
      </div>
    </div>
  );
};

export default Home;
