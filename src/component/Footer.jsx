import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-white text-2xl font-bold">MOVIE</h2>
          </div>
          <p className="text-sm leading-relaxed">
            <span className="text-orange-500 font-semibold">MOVIE</span> – Phim hay -
            Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh,
            lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ,
            phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan,
            Nhật Bản, Âu Mỹ... Khám phá nền tảng phim trực tuyến hay nhất 2025
            chất lượng 4K!
          </p>
        </div>

        {/* Cột 2: Danh mục */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">DANH MỤC</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Mới</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Bộ</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Lẻ</a></li>
          </ul>
        </div>

        {/* Cột 3: Thể loại */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">THỂ LOẠI</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Cổ Trang</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Hành Động</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Hoạt Hình</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Phim Võ Thuật</a></li>
          </ul>
        </div>

        {/* Cột 4: Điều khoản */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">ĐIỀU KHOẢN</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">DMCA</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Liên Hệ</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm text-gray-500">
        © 2025 MOVIE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
