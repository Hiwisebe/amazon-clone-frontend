import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {imgItem} from './img/data'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import  classes from "./Carousel.module.css"
function aboutCarousel () {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {imgItem.map((items, index) => (
          <img key={index} src={items} />
        ))}
      </Carousel>
      <div className={classes.bottom_fade}></div>
    </>
  );
}

export default aboutCarousel;
