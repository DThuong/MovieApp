import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouTube from 'react-youtube';
import Modal from 'react-modal';

if (typeof document !== 'undefined') {
  Modal.setAppElement(document.getElementById('root') || document.body);
}

const opts = {
  width: '100%',
  height: '100%',
  playerVars: { autoplay: 1 },
};

const customStyles = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000 },
  content: {
    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    padding: '20px', border: 'none', borderRadius: '10px',
    backgroundColor: '#1a1a1a', maxWidth: '90vw', maxHeight: '90vh', width: '800px',
  },
};

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 6 },
  tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 2 }
};

const MovieList = ({ title, data = [] }) => {
  const [filmId, setFilmId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  async function handleTrailer(id) {
    setIsLoading(true);
    setFilmId('');
    setErrorText('');

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
          },
        }
      );

      const videoData = await res.json();
      const trailer = videoData.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );

      if (trailer) {
        setFilmId(trailer.key);
        setIsModalOpen(true);
      } else {
        setErrorText('Không tìm thấy trailer cho phim này.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setErrorText('Lỗi tải trailer, thử lại sau.');
      setIsModalOpen(true);
      console.error('❌ Lỗi khi fetch trailer:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-white w-full p-5">
      <h2 className="text-[30px] font-bold uppercase mb-3">{title}</h2>

      <Carousel responsive={responsive} containerClass="pb-5" itemClass="px-2">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTrailer(item.id)}
            className="w-full h-[400px] relative group overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 w-full px-3 text-center z-20">
                <h3 className="text-white text-[20px] font-bold">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
      >
        <button
          className="text-white bg-red-600 px-3 py-1 rounded-md mb-2 hover:bg-red-700 transition-colors"
          onClick={() => setIsModalOpen(false)}
        >
          Đóng
        </button>

        {isLoading ? (
          <p className="text-white">Đang tải trailer...</p>
        ) : filmId ? (
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16 / 9' }}>
  <YouTube
    videoId={filmId}
    opts={opts}
    className="absolute inset-0 w-full h-full"
    iframeClassName="w-full h-full"
  />
</div>
        ) : (
          <p className="text-white">{errorText}</p>
        )}
      </Modal>
    </div>
  );
};

export default MovieList;
