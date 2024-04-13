// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// Import Swiper styles

import { useState } from 'react';

type SinglePageSwiperProps = {
  images: string[];
};

export default function SinglePageSwiper({ images }: SinglePageSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        spaceBetween={24}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images
          .filter((imgUrl) => imgUrl)
          .map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <img
                className='SingleAddImg'
                src={'/img/' + imgUrl}
                alt={'car'}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={false}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images
          .filter((imgUrl) => imgUrl)
          .map((imgUrl, i) => (
            <SwiperSlide key={i}>
              <img
                className='SingleAThumb'
                src={'/img/' + imgUrl}
                alt={'car'}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
