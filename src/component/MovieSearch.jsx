import React from 'react'

const MovieSearch = ({ title, data }) => {
   return (
    <div className="text-white px-4 sm:px-10 mb-10 mt-3">
      <h2 className="uppercase text-lg sm:text-xl mb-1">{title}</h2>

      {data.length === 0 ? (
        <p className="text-gray-400 text-center sm:text-left">
          Không tìm thấy kết quả nào
        </p>
      ) : (
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-3 sm:gap-4
        ">
          {data.map((item) => (
            <div key={item.id} className="w-full">
              <div className="group relative w-full aspect-[2/3] cursor-pointer overflow-hidden rounded-md">
                <img
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
    </div>
  )
}

export default MovieSearch