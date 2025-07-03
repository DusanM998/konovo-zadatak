import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slides } from "../utility/types";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/login/LoginModal";
import { useSelector } from "react-redux";
import type { RootState } from "../storage/redux/store";

const MainPage = () => {
  const [current, setCurrent] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userAuthStore);

  const handleOfferClick = () => {
    if (user.username) {
      navigate("/products");
    } else {
      setShowLoginModal(true);
    }
  };

  /*const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate("/products");
  };*/

  // Automatska smena slajda
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative max-w-6xl mx-auto mt-6 rounded-xl overflow-hidden shadow-lg h-[400px] mb-20">
      <div className="relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${index === current ? "block" : "hidden"}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] object-cover md:object-fill"
            />

            <div
              className="absolute inset-0 flex flex-col items-center 
                justify-center text-center px-6 md:px-16 bg-black/40"
            >
              <span
                className="bg-orange-500 text-white text-xs
               md:text-sm px-4 py-1 rounded-full font-semibold mb-2 uppercase"
              >
                {slide.label}
              </span>
              <h2 className="text-white text-xl md:text-3xl font-bold mb-3">
                {slide.title}
              </h2>
              <p className="text-gray-100 text-sm md:text-base max-w-xl mb-5">
                {slide.subtitle}
              </p>
              <button
                className="bg-orange-500 text-white font-semibold
               px-6 py-2 rounded-full hover:bg-orange-600 transition"
                onClick={handleOfferClick}
              >
                Pogledaj Ponudu
              </button>
            </div>
          </div>
        ))}

        {/* Strelice */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2
           bg-white text-orange-500 p-2 rounded-full shadow hover:bg-orange-100 z-20"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2
           bg-white text-orange-500 p-2 rounded-full shadow hover:bg-orange-100 z-20"
        >
          <FaChevronRight />
        </button>

        {/* Indikatori */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default MainPage;
