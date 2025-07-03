import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../../assets/images/konovo_logo_light.png";
import dostava from "../../assets/images/dostava-50x50-1.png";
import siguranPartner from "../../assets/images/siguran-partner.png";
import support from "../../assets/images/support.png";
import uvekDostupni from "../../assets/images/uvek-dostupni.png";
import { categoriesFooter } from "../../utility/types";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 px-6 lg:px-20">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm border-b border-gray-700 pb-8">
        <div>
          <img
            src={dostava}
            alt="Besplatna dostava"
            className="mx-auto mb-2 h-6"
          />
          <p className="font-semibold">BESPLATNA DOSTAVA</p>
          <p>Za porudžbine preko 10.000 RSD.</p>
        </div>
        <div>
          <img src={support} alt="24/7 Podrška" className="mx-auto mb-2 h-6" />
          <p className="font-semibold">24/7 PODRŠKA</p>
          <p>Stojimo vam na raspolaganju.</p>
        </div>
        <div>
          <img
            src={siguranPartner}
            alt="Siguran partner"
            className="mx-auto mb-2 h-6"
          />
          <p className="font-semibold">SIGURAN PARTNER</p>
          <p>Uvek otvoreni za saradnju.</p>
        </div>
        <div>
          <img src={uvekDostupni} alt="Dostupni" className="mx-auto mb-2 h-6" />
          <p className="font-semibold">UVEK DOSTUPNI</p>
          <p>Viber, Whatsapp, SMS, Poziv</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10 text-sm">
        {/* Logo i kontakt */}
        <div className="bg-gray-900 p-5 rounded-lg space-y-3 md:col-span-1">
          <img src={logo} alt="Konovo Logo" className="h-8" />
          <p>
            Najveća online prodavnica računara i računarske opreme sa preko 50
            000 proizvoda po najboljim cenama.
          </p>

          <div>
            <p className="font-semibold mt-3">Radno vreme</p>
            <p>Radnim danima: 09:00 - 21:00</p>
            <p>Subotom: 10:00 - 20:00</p>
          </div>

          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +381 060 5858-159
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> 011/4543-452
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> prodaja@konovo.rs
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <a href="https://www.facebook.com/konovo.rs">
              <FaFacebookF className="hover:text-orange-500" />
            </a>
            <a href="https://www.instagram.com/konovors/">
              <FaInstagram className="hover:text-orange-500" />
            </a>
            <a href="https://www.youtube.com/@konovors">
              <FaYoutube className="hover:text-orange-500" />
            </a>
            <a href="https://www.tiktok.com/@konovo.rs">
              <FaTiktok className="hover:text-orange-500" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3">Popularne Kategorije</p>
          <ul className="space-y-1">
            {categoriesFooter.map((categoryName) => (
              <li key={categoryName}>
                <Link
                  to={`/products?categoryName=${encodeURIComponent(
                    categoryName
                  )}`}
                  className="hover:text-orange-500"
                >
                  {categoryName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3">KONOVO.RS</p>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500">Kontakt</a></li>
            <li><a href="#" className="hover:text-orange-500">O Nama</a></li>
            <li><a href="#" className="hover:text-orange-500">Naš Asortiman</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-6 mt-6 border-t border-gray-700">
        © <strong className="text-white">KONOVO DOO</strong> 2025. Sva prava
        zadržana
      </div>
    </footer>
  );
};

export default Footer;
