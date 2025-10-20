import Header from "./component/Header";
import Banner from "./component/Banner";
import MovieList from "./component/MovieList";
import MovieSearch from "./component/MovieSearch";
import { useEffect, useRef, useState } from "react";

function App() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resultRef = useRef(null);

  async function handleSearch(searchTerm, shouldScroll = false) {
      // Nếu search term rỗng, reset về trang chủ
      if (!searchTerm || searchTerm.trim() === "") {
        setSearchContent([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);     
      try {
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=vi&page=1&query=${searchTerm}`;
        const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`
        }
      };
      const res = await fetch(url, options);
      const data = await res.json();

      const moviesWithPosters = data.results.filter(movie => movie.poster_path);
      setSearchContent(moviesWithPosters);

      if(shouldScroll){
          setTimeout(() => {
          if (resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm phim:", error);
        setSearchContent([]);
        return;
      } finally {
        setIsLoading(false);
      }

  }

  useEffect(() => {
    const urls = [
      "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
      "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1",
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
        // chạy 2 fetch song song với nhau
        const [res1, res2] = await Promise.all(urls.map(url => fetch(url, options)));

        // chờ cả 2 response chuyển sang json
        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        setPopular(data1.results.filter(movie => movie.poster_path) || []);
        setTopRated(data2.results.filter(movie => movie.poster_path) || []);
      } catch (error) {
        console.error("❌ Lỗi khi fetch dữ liệu:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-black pb-8">
      <Header onSearch={handleSearch}/>
      <Banner />
      <div ref={resultRef}>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              {/* Spinner */}
              <div className="inline-block w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-lg">Đang tìm kiếm...</p>
            </div>
          </div>
        ) : searchContent.length > 0 ? (
          <MovieSearch title="Kết quả tìm kiếm" data={searchContent} />
        ) : (
          <>
            <MovieList title="POPULAR" data={popular} />
            <MovieList title="TOP RATED" data={topRated} />
          </>
        )}
      </div>
      
    </div>
  );
}

export default App;
