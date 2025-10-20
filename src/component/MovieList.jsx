import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouTube from 'react-youtube';
import Modal from 'react-modal';

// Chỉ set app element nếu element tồn tại
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root') || document.body;
  Modal.setAppElement(rootElement);
}

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
  },
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2
  }
};

const MovieList = ({title, data = []}) => {
  const [filmId, setFilmId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleTrailer(id){
    setIsLoading(true);
    setFilmId('');
    setIsModalOpen(true);
    
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`
        }
      };
      
      const res = await fetch(url, options);
      const data = await res.json();
      
      if(data.results && data.results.length > 0) {
        setFilmId(data.results[0]?.key);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setFilmId('');
    setIsLoading(false);
  };

  return (
    <div className='text-white w-full p-5'>
      <h2 className='text-[30px] font-bold uppercase mb-3'>{title}</h2>
      <Carousel responsive={responsive} containerClass='pb-5' itemClass="px-2">
        {data.length > 0 &&
          data.map((item) => (
            <div
              onClick={() => handleTrailer(item.id)}
              key={item.id}
              className="w-full h-[400px] relative group overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.original_title}
                  />
                </div>
                <div className="absolute bottom-4 left-0 w-full px-3 text-center">
                  <h3 className="text-white text-[20px] font-bold">
                    {item.title || item.original_title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
        
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Movie Trailer"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <button 
          className='text-white bg-red-600 px-3 py-1 rounded-md mb-2 hover:bg-red-700 transition-colors' 
          onClick={closeModal}
        >
          Đóng
        </button>
        {isLoading ? (
          <p className="text-white">Đang tải trailer...</p>
        ) : filmId ? (
          <YouTube videoId={filmId} opts={opts} />
        ) : (
          <p className="text-white">Không tìm thấy trailer</p>
        )}
      </Modal>
    </div>
  )
}

export default MovieList