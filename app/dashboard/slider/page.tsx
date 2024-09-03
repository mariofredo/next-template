import {Slider} from '@/components';
import {ImageSliderOne} from '@/public';
export default function SliderPage() {
  return (
    <div className='page_ctr'>
      <h1>Slider Full</h1>
      <div className='page_wrapper'>
        <Slider
          data={[
            {
              image: ImageSliderOne,
            },
            {
              image: ImageSliderOne,
            },
            {
              image: ImageSliderOne,
            },
          ]}
          settings={{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: false,
          }}
        />
      </div>
      <h1>Slider Center</h1>
      <div className='page_wrapper'>
        <Slider
          data={[
            {
              image: ImageSliderOne,
            },
            {
              image: ImageSliderOne,
            },
            {
              image: ImageSliderOne,
            },
          ]}
          settings={{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
          }}
        />
      </div>
    </div>
  );
}
