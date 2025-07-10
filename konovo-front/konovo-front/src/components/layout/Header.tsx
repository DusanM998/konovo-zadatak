import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/konovo_logo_light.png";
import { FaSearch, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import LoginModal from "../login/LoginModal";
import { type RootState } from "../../storage/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../storage/redux/userAuthSlice";
import { useGetAllProductsQuery } from "../../apis/productApi";
import { SearchedProducts } from "../Products/importsProducts";
import toastNotify from "../../helper/toastNotify";

const navItems = ["Proizvodi", "Kontakt"];

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  //vraca logovanog korisnika iz redux store-a
  //useSelector koristim jer zelim da pristupim stanju iz redux store-a
  const user = useSelector((state: RootState) => state.userAuthStore);
  const dispatch = useDispatch(); //useDispatch se koristi za slanje akcija prema redux store-u
  
  //debounced input pretrage sprecava visak API poziva
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //za zatvaranje dropdown menija klikom van njega
  const dropdownRef = useRef<HTMLDivElement>(null);

  //ako korisnik nije prijavljen, a zeli da otvori ponudu proizvoda
  // otvara modal za prijavu
  const handleOfferClick = () => {
    if (user.username) {
      navigate("/products");
    } else {
      toastNotify("Prijavite se da biste nastavili.", "info");
      setIsLoginModalOpen(true);
    }
  };

  //poziva API da dohvati proizvode sa query hookom useGetAllProductsQuery
  const { data: results = [], isLoading } = useGetAllProductsQuery(
    debouncedSearch.length >= 2 ? { search: debouncedSearch } : {},
    { skip: debouncedSearch.length < 2 }
  );

  //console.log("Rezultati pretrage: ", results);

  //brise token iz localStorage - a i azurira stanje sa dispatch
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };


  //za pretragu - pokrece se svaki put kada se search string promeni
  //
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search); //debounce omogucava da se pozivi APIja ne desavaju svaki put kada korisik pritisne taster
      //vec tek nakon sto prestane da kuca tj nakon 100ms

      if (search.length >= 2) { //ako je search string duzi od 2 kar. otvara dropdown meni sa rezultatima pretrage
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }, 100); //ceka 100ms pre nego sto izvrsi pretragu

    return () => clearTimeout(timer); //cisti timer da se ne bi izvrsavao vise puta
  }, [search]);

  //pokrece se samo pri mountovanju komponente i koristi se za
  //dodavanje event listenera(f-ja koja osluskuje da li se dogodio neki dogadjaj
  // i reaguje na njega) koji detektuje klik van dropdown menija
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) //proverava da li je kliknuto na element van dropdowna
      ) {
        setIsDropdownOpen(false); //Sakriva dropdown meni za search
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); //"slusa" klikove na ceo dokument

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="w-full">
      <div className="bg-black text-white shadow-sm w-full">
        <div className="max-w-7xl text-xs mx-auto px-4 py-3 flex items-center justify-between md:justify-between relative">
          <div className="space-x-4 hidden md:flex">
            <span>RATKA MITROVIĆA 134 BEOGRAD</span>
            <span>PRODAJA@KONOVO.RS</span>
            <span>PON - PET 09:00-21:00 SUB 10:00-20:00</span>
          </div>
          <div className="text-right">
            <a href="tel:+3810605858159" className="hover:underline">
              +381 060 5858-159, 011/4543-452
            </a>
          </div>
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
            <NavLink className="nav-link" aria-current="page" to="/">
              <img src={logo} alt="Konovo" className="h-8" />
            </NavLink>
          </div>

          {/* Login - Mobilni */}
          <div className="block md:hidden">
            {user.username ? (
              <>
                <span 
                  className="text-sm cursor-pointer"
                  onClick={() => navigate('/userProfile')}
                >
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
                className="cursor-pointer"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <FaUser />
              </button>
            )}
          </div>

          {/* Desktop prikaz*/}
          <div className="hidden md:flex items-center justify-between w-full">
            <NavLink className="nav-link" aria-current="page" to="/">
              <img src={logo} alt="Konovo" className="h-8" />
            </NavLink>

            {/* Search bar za proizvode - samo ako je korisnik logovan*/}
            <div className="flex-grow flex justify-center">
              {user.username ? (
                <div className="flex flex-col w-[400px]" ref={dropdownRef}>
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
                      onFocus={() => {
                        if (debouncedSearch.length >= 2) {
                          setIsDropdownOpen(true);
                        }
                      }}
                    />
                    <button className="bg-orange-500 px-4 py-2 text-white rounded-full">
                      <FaSearch />
                    </button>
                  </div>

                  {/* Filtrirani proizvodi po nazivu */}
                  <SearchedProducts
                    results={results}
                    isOpen={isDropdownOpen}
                    isLoading={isLoading}
                    query={debouncedSearch}
                    onClose={() => setIsDropdownOpen(false)}
                  />
                </div>
              ) : null}
            </div>

            <div className="flex-none flex items-center space-x-2">
              <FaUser className="mr-1" />
              {user.username ? (
                <>
                  <span 
                    className="text-sm cursor-pointer"
                    onClick={() => navigate('/userProfile')}  
                  >
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
        <div className="md:hidden px-4 pb-3 relative">
          {user.username ? (
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
                onFocus={() => {
                  if (debouncedSearch.length >= 2) {
                    setIsDropdownOpen(true);
                  }
                }}
              />
              <button className="bg-orange-500 px-4 py-2 text-white">
                <FaSearch />
              </button>
              <SearchedProducts
                results={results}
                isOpen={isDropdownOpen}
                isLoading={isLoading}
                query={debouncedSearch}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>
          ) : null}
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
                onClick={item === "Proizvodi" ? handleOfferClick : undefined}
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
              onClick={item === "Proizvodi" ? handleOfferClick : undefined}
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
