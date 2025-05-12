import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroCarousal = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
 

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };
  const carouselSlides = [
    {
      id: 1,
     image: '/carousal-3.webp',
      title: 'RIDE LIKE A PRO',
      subtitle: 'Premium gear for serious riders',
      cta: 'SHOP NOW',
      link: '/collections/premium'
    },
    {
      id: 2,
      image: '/carousal-2.webp',
      title: 'NEW SEASON COLLECTION',
      subtitle: 'Get ready for summer trails',
      cta: 'EXPLORE',
      link: '/collections/summer'
    },
    {
      id: 3,
      image: '/carousal-1.webp',title: 'SAFETY FIRST',
      subtitle: 'Top-rated helmets and protection',
      cta: 'SHOP SAFETY',
      link: '/collections/safety'
    }
  ];
return (
    <section className="relative">
    <div className="relative h-96 md:h-screen max-h-[650px] overflow-hidden">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className=" object-cover w-full h-full"
            //   style={{ objectPosition: 'end' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-white mb-6">{slide.subtitle}</p>
                  <a
                    href={slide.link}
                    className="inline-block bg-primary text-secondary px-6 py-3 font-bold hover:bg-white transition-colors duration-300"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
    >
      <ChevronLeft size={24} />
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
    >
      <ChevronRight size={24} />
    </button>
    
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {carouselSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full ${
            index === currentSlide ? 'bg-primary' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  </section>
)
}

export default HeroCarousal