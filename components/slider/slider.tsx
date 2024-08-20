'use client';
import ReactSlick, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image, {StaticImageData} from 'next/image';
import '@/styles/slider.scss';
interface SliderProps {
  data: {image: string | StaticImageData}[];
  settings: Settings;
}
export default function Slider({
  data = [],
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
  },
}: SliderProps) {
  return (
    <div className='slider_ctr'>
      <ReactSlick {...settings}>
        {data.map(({image}, i) => (
          <div className='slider_item' key={`slider_${i + 1}`}>
            <h1>{i + 1}</h1>
            <Image src={image} alt={`slider_${i + 1}`} />
          </div>
        ))}
      </ReactSlick>
    </div>
  );
}
