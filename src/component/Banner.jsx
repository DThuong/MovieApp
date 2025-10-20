import React, { useEffect, useState } from "react";
import rating from "../assets/rating.png";
import halfRating from "../assets/rating-half.png";
import IconPlay from "../assets/play-button.png";
import Modal from "react-modal";
import YouTube from "react-youtube";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  // Hàm fetch phim có trailer hợp lệ
  useEffect(() => {
    async function fetchBannerMovie() {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
          },
        };

        // Lấy danh sách now playing
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await res.json();
        const movies = data.results || [];

        // Kiểm tra trailer hợp lệ song song
        const trailers = await Promise.all(
          movies.map(async (movie) => {
            const resVideo = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
              options
            );
            const dataVideo = await resVideo.json();
            const trailer = dataVideo.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            return trailer ? { ...movie, trailerKey: trailer.key } : null;
          })
        );

        // Lọc ra phim có trailer hợp lệ
        const validMovies = trailers.filter(Boolean);

        if (validMovies.length > 0) {
          // Chọn random 1 phim có trailer
          const randomMovie =
            validMovies[Math.floor(Math.random() * validMovies.length)];
          setBannerMovie(randomMovie);
          setTrailerKey(randomMovie.trailerKey);
        }
      } catch (error) {
        console.error("❌ Lỗi khi fetch banner movie:", error);
      }
    }

    fetchBannerMovie();
  }, []);

  if (!bannerMovie)
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-white">
        Đang tải banner...
      </div>
    );

  return (
    <div
      className="w-full h-auto sm:h-[600px] bg-cover bg-no-repeat bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path})`,
      }}
    >
      {/* Overlay tối */}
      <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full h-full flex flex-col sm:flex-row items-center justify-center sm:justify-around px-4 sm:px-12 py-10 sm:py-0 gap-8">
        {/* Phần text */}
        <div className="flex flex-col space-y-4 w-full sm:w-[400px] text-center sm:text-left">
          <p className="bg-gradient-to-r from-red-700 to-red-300 w-fit mx-auto sm:mx-0 text-white px-2 py-2 text-sm sm:text-base">
            {bannerMovie.media_type?.toUpperCase() || "MOVIE"}
          </p>

          <p className="text-white font-bold text-2xl sm:text-[30px] leading-snug">
            {bannerMovie.title || bannerMovie.name}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img src={rating} alt="" className="w-5 h-5" />
            <img src={rating} alt="" className="w-5 h-5" />
            <img src={rating} alt="" className="w-5 h-5" />
            <img src={rating} alt="" className="w-5 h-5" />
            <img src={halfRating} alt="" className="w-5 h-5" />
          </div>

          {/* Mô tả */}
          <p className="text-white text-xs sm:text-sm text-justify leading-relaxed tracking-wide z-10">
            {bannerMovie.overview || "Không có mô tả"}
          </p>

          {/* Nút hành động */}
          <div className="flex justify-center sm:justify-start space-x-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-black px-3 py-2 text-sm sm:text-base cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-200"
            >
              Chi Tiết
            </button>
            <button
              onClick={() => setIsTrailerOpen(true)}
              className="text-white bg-red-500 px-3 py-2 text-sm sm:text-base cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-200"
            >
              Xem Phim
            </button>
          </div>
        </div>

        {/* Phần ảnh */}
        <div className="w-full sm:w-[50%] flex items-center justify-center">
          <div className="w-[220px] sm:w-[300px] h-[320px] sm:h-[400px] relative group">
            <img
              className="w-full h-full object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/original${bannerMovie.poster_path}`}
              alt={bannerMovie.title}
            />
            <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-pointer rounded-md">
              <img className="w-12 h-12 sm:w-16 sm:h-16" src={IconPlay} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal chi tiết */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-black/90 text-white p-6 max-w-lg mx-auto mt-20 rounded-lg outline-none relative z-[1001]"
        overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-start z-[1000]"
      >
        <h2 className="text-2xl font-bold mb-4">
          {bannerMovie.title || bannerMovie.name}
        </h2>
        <p className="text-sm leading-relaxed">{bannerMovie.overview}</p>
        <button
          className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setIsModalOpen(false)}
        >
          Đóng
        </button>
      </Modal>

      {/* Modal xem trailer */}
      <Modal
        isOpen={isTrailerOpen}
        onRequestClose={() => setIsTrailerOpen(false)}
        className="bg-black p-2 rounded-lg max-w-3xl mx-auto mt-20 outline-none relative z-[1001]"
        overlayClassName="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000]"
      >
        <YouTube
          videoId={trailerKey}
          opts={{
            width: "100%",
            playerVars: {
              autoplay: 1,
            },
          }}
        />
        <button
          className="mt-4 bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700"
          onClick={() => setIsTrailerOpen(false)}
        >
          Đóng
        </button>
      </Modal>
    </div>
  );
};

export default Banner;
