import React, { useEffect, useRef, useState, Suspense, lazy } from "react";

// 🔹 Lazy load các component nặng
const Header = lazy(() => import("./component/Header"));
const Banner = lazy(() => import("./component/Banner"));
const MovieList = lazy(() => import("./component/MovieList"));
const MovieSearch = lazy(() => import("./component/MovieSearch"));

function App() {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
  });
  const [searchContent, setSearchContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef(null);

  // Xử lý search phim
  async function handleSearch(searchTerm, shouldScroll = false) {
    if (!searchTerm || searchTerm.trim() === "") {
      setSearchContent([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchTerm}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      const moviesWithPosters = data.results.filter(movie => movie.poster_path);
      setSearchContent(moviesWithPosters);

      // scroll đến kết quả
      if (shouldScroll) {
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm phim:", error);
      setSearchContent([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch 4 danh mục phim song song
  useEffect(() => {
    const urls = [
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    ];

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
      },
    };

    async function fetchData() {
      try {
        const [res1, res2, res3, res4] = await Promise.all(
          urls.map(url => fetch(url, options))
        );
        const [data1, data2, data3, data4] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
        ]);

        setMovies({
          popular: data1.results.filter(movie => movie.poster_path) || [],
          topRated: data2.results.filter(movie => movie.poster_path) || [],
          nowPlaying: data3.results.filter(movie => movie.poster_path) || [],
          upcoming: data4.results.filter(movie => movie.poster_path) || [],
        });
      } catch (error) {
        console.error("❌ Lỗi khi fetch dữ liệu:", error);
      }
    }

    fetchData();
  }, []);

  // Loading fallback UI
  const LoadingFallback = (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-3">Đang tải...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-black pb-8">
      {/* Header */}
      <Suspense fallback={LoadingFallback}>
        <Header onSearch={handleSearch} />
      </Suspense>

      {/* Banner */}
      <Suspense fallback={LoadingFallback}>
        <Banner />
      </Suspense>

      <div ref={resultRef}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-lg">Đang tìm kiếm...</p>
            </div>
          </div>
        ) : searchContent.length > 0 ? (
          <Suspense fallback={LoadingFallback}>
            <MovieSearch title="Kết quả tìm kiếm" data={searchContent} />
          </Suspense>
        ) : (
          <>
            <Suspense fallback={LoadingFallback}>
              <MovieList title="POPULAR" data={movies.popular} />
            </Suspense>
            <Suspense fallback={LoadingFallback}>
              <MovieList title="TOP RATED" data={movies.topRated} />
            </Suspense>
            <Suspense fallback={LoadingFallback}>
              <MovieList title="UPCOMING" data={movies.upcoming} />
            </Suspense>
            <Suspense fallback={LoadingFallback}>
              <MovieList title="NOW PLAYING" data={movies.nowPlaying} />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
