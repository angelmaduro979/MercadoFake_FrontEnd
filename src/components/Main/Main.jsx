import React from 'react'
import './Main.css'
import { Slider } from '../components_index.js'
import image1 from '../../assets/images/MainSlider/image1.webp';
import image2 from '../../assets/images/MainSlider/image2.webp';
import image3 from '../../assets/images/MainSlider/image3.webp';
import image4 from '../../assets/images/MainSlider/image4.webp';
import image5 from '../../assets/images/MainSlider/image5.webp';
import image6 from '../../assets/images/MainSlider/image6.webp';
import image7 from '../../assets/images/MainSlider/image7.webp';


const Main = () => {

    const slides = [
        { image: image1, title: 'Image 1' },
        { image: image2, title: 'Image 2' },
        { image: image3, title: 'Image 3' },
        { image: image4, title: 'Image 4' },
        { image: image5, title: 'Image 5' },
        { image: image6, title: 'Image 6' },
        { image: image7, title: 'Image 7' }
      ];

      




  return (
    <main>
        <Slider slides={slides} intervalTime={5000} className2={"main-slider-container-inner"} className3={"main-slider"} className4={"main-left-arrow"} className5={"main-right-arrow"} className1={"main-slider-container"} className6={"main-slide-image"}  cardsToShow={1}/>
    </main>
  )
}

export default Main