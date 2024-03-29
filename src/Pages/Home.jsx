import React, { useEffect } from 'react';
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
  useEffect(() => {
    // Initialize Flickity when the component mounts
    const flickityElement = document.querySelector('.carousel');
    new Flickity(flickityElement, {
      wrapAround: true // Example configuration option
    });
  }, []);

  return (
    <div className={style.home}>
      <Filter />
      <div className={`carousel ${style.tasks}`}>
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
