import React from 'react'
import rating from "../assets/rating.png"
import halfRating from "../assets/rating-half.png"
import frontBanner from "../assets/front-banner.jpeg"
import IconPlay from "../assets/play-button.png"
const Banner = () => {
  return (
    <div className="w-full h-auto sm:h-[600px] bg-[url(/banner.png)] bg-cover bg-no-repeat bg-center relative overflow-hidden">
      {/* Overlay tối */}
      <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full h-full flex flex-col sm:flex-row items-center justify-center sm:justify-around px-4 sm:px-12 py-10 sm:py-0 gap-8">
        
        {/* Phần text */}
        <div className="flex flex-col space-y-4 w-full sm:w-[400px] text-center sm:text-left">
          <p className="bg-gradient-to-r from-red-700 to-red-300 w-fit mx-auto sm:mx-0 text-white px-2 py-2 text-sm sm:text-base">
            TV Show
          </p>

          <p className="text-white font-bold text-2xl sm:text-[30px] leading-snug">
            Nghe Nói Em Thích Tôi
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img src={rating} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            <img src={rating} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            <img src={rating} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            <img src={rating} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            <img src={halfRating} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Mô tả */}
          <p className="text-white text-xs sm:text-sm text-justify leading-relaxed tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, rerum
            dolorum magni expedita quasi repellat, obcaecati repellendus, assumenda
            deleniti quo cumque animi? Laudantium libero enim error veritatis sed,
            optio earum?
          </p>

          {/* Nút hành động */}
          <div className="flex justify-center sm:justify-start space-x-3 pt-2">
            <button className="text-white bg-black px-3 py-2 text-sm sm:text-base cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-200">
              Chi Tiết
            </button>
            <button className="text-white bg-red-500 px-3 py-2 text-sm sm:text-base cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-200">
              Xem Phim
            </button>
          </div>
        </div>

        {/* Phần ảnh */}
        <div className="w-full sm:w-[50%] flex items-center justify-center">
          <div className="w-[220px] sm:w-[300px] h-[320px] sm:h-[400px] relative group">
            <img
              className="w-full h-full object-cover rounded-md"
              src={frontBanner}
              alt=""
            />
            <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-pointer rounded-md">
              <img className="w-12 h-12 sm:w-16 sm:h-16" src={IconPlay} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner