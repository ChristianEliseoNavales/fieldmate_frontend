import { useState, useEffect } from 'react';

export default function ThreePositionSlider() {
  const slides = [
    { swiper: '/pictures/LV1.jpg', bg: '/pictures/LV1.jpg' },
    { swiper: '/pictures/LVGate.jpg', bg: '/pictures/LVGate.jpg' },
    { swiper: '/pictures/LVBG.jpg', bg: '/pictures/LVBG.jpg' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const getSlide = (offset) => {
    const index = (activeIndex + offset + slides.length) % slides.length;
    return slides[index];
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500 opacity-20"
        style={{
          backgroundImage: `url(${slides[activeIndex].bg})`,
          
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 h-full flex items-center justify-end pr-16 mt-15">
        <div className="flex items-center space-x-6">
          {/* Left image */}
          <div className="w-[93px] h-[293.73px] overflow-hidden rounded-xl opacity-60 shadow-xl">
            <img
              src={getSlide(-1).swiper}
              alt="Previous"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center image */}
          <div className="w-[691px] h-[518.25px] overflow-hidden rounded-xl shadow-2xl scale-100 transition-all duration-500">
            <img
              src={getSlide(0).swiper}
              alt="Current"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right image */}
          <div className="w-[93px] h-[293.73px] overflow-hidden rounded-xl opacity-60 shadow-xl">
            <img
              src={getSlide(1).swiper}
              alt="Next"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
