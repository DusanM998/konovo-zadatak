import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/konovo_logo_light.png";
import { FaSearch, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import LoginModal from "../login/LoginModal";
import { type RootState } from "../../storage/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../storage/redux/userAuthSlice";
import { useGetAllProductsQuery } from "../../apis/productApi";
import type { ProductModel } from "../../interfaces/productModel";

const navItems = ["Proizvodi", "Kontakt"];

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.userAuthStore);
  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleOfferClick = () => {
    if (user.username) {
      navigate("/products");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: results = [], isLoading } = useGetAllProductsQuery(
    debouncedSearch.length >= 2 ? { search: debouncedSearch } : {},
    { skip: debouncedSearch.length < 2 }
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <header className="w-full">
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
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
          {/* Hamburger meni (mobilni) */}
          <div className="block md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={20} />
            </button>
          </div>

          {/* Logo - Mobilni*/}
          <div className="absolute left-1/2 -translate-x-1/2 block md:hidden">
            <img src={logo} alt="Konovo" className="h-8 mx-auto" />
          </div>

          {/* Login - Mobilni */}
          <div className="block md:hidden">
            <button onClick={() => navigate("/login")}>
              <FaUser />
            </button>
          </div>

          {/* Desktop prikaz*/}
          <div className="hidden md:flex items-center justify-between w-full">
            <NavLink className="nav-link" aria-current="page" to="/">
              <img src={logo} alt="Konovo" className="h-8" />
            </NavLink>

            {/* Search bar za proizvode - samo ako je korisnik logovan*/}
            <div className="flex-grow flex justify-center">
              {user.username ? (
                <div className="flex flex-col w-[400px]">
                  <div
                    className="flex items-center border border-gray-500 rounded-full
                      overflow-hidden bg-white text-black"
                  >
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

                  {/* Filtrirani proizvodi po nazivu */}
                  {debouncedSearch.length >= 2 && results.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded-b-lg shadow mt-1 max-h-60 overflow-y-auto">
                      {results.map((product: ProductModel) => (
                        <li key={product.sif_product}>
                          <Link
                            to={`/product/${product.sif_product}`}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-orange-100 text-sm text-black"
                          >
                            <img
                              src={product.imgsrc}
                              alt={product.naziv}
                              className="w-10 h-10 object-contain border rounded"
                            />
                            <span>{product.naziv}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Ako ne postoji proizvod sa imenom koje je korisnik uneo u search */}
                  {debouncedSearch.length >= 2 &&
                    !isLoading &&
                    results.length === 0 && (
                      <div className="bg-white border border-gray-300 rounded-b-lg shadow mt-1 px-4 py-2 text-sm text-gray-600">
                        Nema rezultata.
                      </div>
                    )}
                </div>
              ) : null}
            </div>

            <div className="flex-none flex items-center space-x-2">
              <FaUser className="mr-1" />
              {user.username ? (
                <>
                  <span className="text-sm">
                    Dobrodosli, <b>{user.username}</b>
                  </span>
                  <button
                    className="flex items-center gap-2
                     bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-orange-600 transition"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                    <FaSignOutAlt />
                  </button>
                </>
              ) : (
                <button
                  className="hover:underline text-sm"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Uloguj Se / Registruj Se
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <div
            className="flex items-center border border-gray-500
           rounded-full overflow-hidden bg-white text-black"
          >
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
              <Link
                key={item}
                to={
                  item === "Proizvodi"
                    ? "/products"
                    : item === "Kontakt"
                    ? "/kontakt"
                    : "#"
                }
                className="block w-full text-left hover:text-orange-500"
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop meni */}
        <div className="max-w-7xl mx-auto px-4 hidden md:flex space-x-6 text-sm py-2">
          {navItems.map((item) => (
            <Link
              key={item}
              to={
                item === "Proizvodi"
                  ? "/products"
                  : item === "Kontakt"
                  ? "/kontakt"
                  : "#"
              }
              onClick={item === "Proizvodi" ? handleOfferClick : null}
              className={`hover:text-orange-500 ${
                item === "Proizvodi" ? "text-orange-600 font-medium" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
