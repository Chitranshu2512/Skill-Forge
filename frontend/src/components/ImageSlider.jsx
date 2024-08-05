import React from 'react';
import Slider from 'react-slick';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

const images = [image1, image2, image3, image4];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};


const ImageSlider = () => {
  return (
    <div className="w-full h-full overflow-hidden rounded-tr-2xl rounded-br-2xl ">
      <Slider {...settings} className="w-full h-full">
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex items-center justify-center rounded-3xl rounded-br-lg ">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
