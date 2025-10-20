import React, {useState} from 'react'

const Header = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchClick = () => {
    onSearch(searchTerm, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm, true);
    }
  };
return (
    <header className="flex flex-col sm:flex-row items-center justify-between bg-black h-auto sm:h-[85px] w-full px-4 sm:px-8 py-3 sm:py-0 gap-3 sm:gap-0">
      {/* Logo + Nav */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 w-full sm:w-auto">
        <h1 className="uppercase text-red-600 font-bold text-2xl sm:text-[40px] tracking-wider">
          movie
        </h1>

        <nav className="flex items-center space-x-3 sm:space-x-6 mt-2 sm:mt-0">
          <a
            href="#"
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full active:scale-95"
          >
            Home
          </a>
          <a
            href="#"
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full active:scale-95"
          >
            About
          </a>
          <a
            href="#"
            className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full active:scale-95"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Search */}
      <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end gap-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Tìm kiếm"
          className="w-full sm:w-[200px] md:w-[300px] border border-gray-400 focus:outline-none rounded-lg px-3 py-2 bg-white"
        />
        <button
          onClick={handleSearchClick}
          className="text-white bg-red-600 rounded-xl px-3 sm:px-4 py-2 font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200"
        >
          Search
        </button>
      </div>
    </header>
  );
}

export default Header