import React, { useState, useEffect, lazy, Suspense } from 'react'
import Modal from 'react-modal'

// Lazy load YouTube component
const YouTube = lazy(() => import('react-youtube'))

if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root') || document.body
  Modal.setAppElement(rootElement)
}

const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    autoplay: 1,
  },
}

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
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: '800px',
  },
}

const MovieSearch = ({ title, data = [] }) => {
  const [filmId, setFilmId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [isFiltering, setIsFiltering] = useState(true)

  useEffect(() => {
    const checkTrailers = async () => {
      if (data.length === 0) {
        setFilteredData([])
        setIsFiltering(false)
        return
      }

      setIsFiltering(true)

      const token = import.meta.env.VITE_MOVIE_API
      const fetchMovieTrailers = async (movie) => {
        try {
          const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`
          const res = await fetch(url, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          const json = await res.json()
          return json.results && json.results.length > 0 ? movie : null
        } catch {
          return null
        }
      }

      // ⚡ Parallel fetching with limit (reduce lag)
      const chunks = []
      const chunkSize = 5
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize))
      }

      const moviesWithTrailers = []
      for (const chunk of chunks) {
        const results = await Promise.all(chunk.map(fetchMovieTrailers))
        moviesWithTrailers.push(...results.filter(Boolean))
      }

      setFilteredData(moviesWithTrailers)
      setIsFiltering(false)
    }

    checkTrailers()
  }, [data])

  async function handleTrailer(id) {
    setIsLoading(true)
    setFilmId('')
    setIsModalOpen(true)

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
          },
        }
      )
      const data = await res.json()
      if (data.results?.length) setFilmId(data.results[0].key)
    } catch (error) {
      console.error('Error fetching trailer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFilmId('')
    setIsLoading(false)
  }

  return (
    <div className="text-white px-4 sm:px-10 mb-10 mt-3">
      <h2 className="uppercase text-lg sm:text-xl mb-1">{title}</h2>

      {isFiltering ? (
        <p className="text-gray-400 text-center sm:text-left">
          Đang kiểm tra trailer...
        </p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-400 text-center sm:text-left">
          Không tìm thấy kết quả nào có trailer
        </p>
      ) : (
        <div
          className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-3 sm:gap-4
        "
        >
          {filteredData.map((item) => (
            <div key={item.id} className="w-full" onClick={() => handleTrailer(item.id)}>
              <div className="group relative w-full aspect-[2/3] cursor-pointer overflow-hidden rounded-md">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-center items-center w-full h-full px-2 text-center">
                    <p className="text-white text-sm sm:text-base font-medium">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Movie Trailer"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <button
          className="text-white bg-red-600 px-3 py-1 rounded-md mb-2 hover:bg-red-700 transition-colors"
          onClick={closeModal}
        >
          Đóng
        </button>
        {isLoading ? (
          <p className="text-white">Đang tải trailer...</p>
        ) : filmId ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              <Suspense fallback={<p className="text-white">Đang tải video...</p>}>
                <YouTube videoId={filmId} opts={opts} className="w-full h-full" />
              </Suspense>
            </div>
          </div>
        ) : (
          <p className="text-white">Không tìm thấy trailer</p>
        )}
      </Modal>
    </div>
  )
}

export default MovieSearch
