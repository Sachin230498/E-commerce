import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCaroselData';
// const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     1024: { items: 3 },
// };



const HomeSlider = () => {
 const items =MainCarouselData.map((item)=>{
        return(
         <img className='cursor-pointer' role="presentation"  src={item.imageUrl} alt="" />
        ) 
 })
    return(
        <>
          <AliceCarousel
        mouseTracking
        items={items}
       disableButtonsControls
       autoPlay
       autoPlayInterval={1000}
       infinite
      />
        </>
      
    )
}
    
   

export default HomeSlider;