import maloprodajaSlika from "../assets/images/Maloprodaja.png";
import karticnoPlacanje from "../assets/images/karticno-placanje.svg";

export default function Kontakt() {
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${maloprodajaSlika})` }}
      >
        <div className="w-full h-full flex items-end p-8 bg-black/30">
          <div className="text-white text-4xl font-bold">
            Ratka Mitrovića 134, Beograd
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-4">
          <iframe
            src="https://www.google.com/maps?q=Ratka%20Mitrovi%C4%87a%20134,%20Beograd&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow"
          ></iframe>
        </div>
        <div className="col-span-1 flex flex-col justify-center bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Kontakt</h2>
          <p>Ratka Mitrovića 134, Cerak, Beograd.</p>
          <p className="mt-2">Maloprodaja: (+381) 60 5858-159</p>
          <p>prodaja@konovo.rs</p>
          <p className="mt-2">Veleprodaja: (+381) 60 5858-864</p>
          <p className="mb-2">veleprodaja@konovo.rs</p>
          <hr />
          <h2 className="text-2xl font-bold mt-2 mb-2">Poslovni podaci</h2>
          <p>Privredno društvo KONOVO doo 11030 Beograd</p>
          <p className="mt-2">PIB: 111497958</p>
          <p>Matični broj: 21491128</p>
          <p className="mt-4">PEPDV: 638416</p>
          <p className="mt-4">Šifra delatnosti: 4651 – Trgovina na velikim računarima, računarskom opremom i softverima</p>
        </div>
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Radno Vreme</h2>
          <ul>
            <li className="flex justify-between py-1 text-xl">
              <span>Ponedeljak</span>
              <span>09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 text-xl">
              <span>Utorak</span>
              <span>09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 text-xl">
              <span>Sreda</span>
              <span>09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 text-xl">
              <span>Četvrtak</span>
              <span>09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 text-xl">
              <span>Petak</span>
              <span>09:00 - 21:00</span>
            </li>
            <li className="flex justify-between py-1 text-orange-600 font-semibold text-xl">
              <span>Subota</span>
              <span>10:00 - 20:00</span>
            </li>
            <li className="flex justify-between border-b py-1 text-orange-600 font-semibold text-xl">
              <span>Nedelja</span>
              <span>Neradan dan</span>
            </li>
            <li className="pt-4 flex justify-between text-xl">
              <span>Mogucnost placanja</span>
            </li>
            <li className="flex justify-between pt-2">
              <img src={karticnoPlacanje} alt="Kartično plaćanje" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
