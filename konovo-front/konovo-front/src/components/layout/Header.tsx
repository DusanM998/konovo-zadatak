import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/konovo_logo_light.png";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";

const navItems = ["Proizvodi", "Kontakt", "About"];

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="w-full">
      <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="space-x-4 hidden md:flex">
          <span>RATKA MITROVIĆA 134 BEOGRAD</span>
          <span>PRODAJA@KONOVO.RS</span>
          <span>PON - PET 09:00-21:00 SUB 10:00-20:00</span>
        </div>
        <div className="text-right text-xs">
          <a href="tel:+3810605858159" className="hover:underline">
            +381 060 5858-159, 011/4543-452
          </a>
        </div>
      </div>

      <div className="bg-black text-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between md:justify-between relative">
          {/* Hamburger meni (mobile) */}
          <div className="block md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={20} />
            </button>
          </div>

          {/* Logo - Mobile (centriran) */}
          <div className="absolute left-1/2 -translate-x-1/2 block md:hidden">
            <img src={logo} alt="Konovo" className="h-8 mx-auto" />
          </div>

          {/* Login - Mobile */}
          <div className="block md:hidden">
            <button onClick={() => navigate("/login")}>
              <FaUser />
            </button>
          </div>

          {/* Desktop prikaz*/}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex-none">
              <img src={logo} alt="Konovo" className="h-8" />
            </div>

            {/* Search bar za proizvode*/}
            <div className="flex-grow flex justify-center">
              <div className="flex items-center border border-gray-500 rounded-full
               overflow-hidden bg-white text-black w-[400px]">
                <input
                  type="text"
                  placeholder="Pretraga proizvoda"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 outline-none w-full"
                />
                <button className="bg-orange-500 px-4 py-2 text-white rounded-full">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex-none flex items-center space-x-2">
              <FaUser className="mr-1" />
              <button
                className="hover:underline text-sm"
                onClick={() => navigate("/login")}
              >
                Uloguj Se / Registruj Se
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border border-gray-500
           rounded-full overflow-hidden bg-white text-black">
            <input
              type="text"
              placeholder="Pretraga proizvoda"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 outline-none w-full"
            />
            <button className="bg-orange-500 px-4 py-2 text-white">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-gray-100 shadow-inner">
        {/* Meni za mobilne uredjaje */}
        {menuOpen && (
          <div className="md:hidden px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                className="block w-full text-left hover:text-orange-500"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Desktop meni */}
        <div className="max-w-7xl mx-auto px-4 hidden md:flex space-x-6 text-sm py-2">
          {navItems.map((item) => (
            <button
              key={item}
              className={`hover:text-orange-500 ${
                item === "Proizvodi" ? "text-orange-600 font-medium" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
