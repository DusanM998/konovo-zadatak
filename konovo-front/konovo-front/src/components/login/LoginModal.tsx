import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useLoginUserMutation } from "../../apis/userAuthApi";
import toastNotify from "../../helper/toastNotify";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../storage/redux/userAuthSlice";
import { useNavigate } from "react-router-dom";

//type moze da predstavlja objekat, uniju, primitivni tip, funkcije, itd...
//type se koristi kada imam kompleksnije tipove
// za razliku od interface koji se koristi ugl. kada se definisu
// klase objekti ili se koristi OOP pristup
type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({
  onClose,
}: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //async f-ja moze da pauzira izvrsenje dok se ne zavrsi neka druga operacija
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); //sprecava reload stranice nakon submita

    try {
      //unutar async f-ja moze da se koristi await da bi se sacekao rezultat asinhrone operacije
      const result = await loginUser({ username, password }).unwrap(); //salje zahtev ka backu sa korisnickim podacima
      // koristim unwrap da bih vratio rez. direktno iz response
      // ako login uspe ovde result je direktno ono sto vraca back, tj. token
      // ako ne uspe, unwrap baca gresku i poziva se catch odmah
      console.log("Rezultat prijave(token):", result);

      localStorage.setItem("token", result.token);
      localStorage.setItem("username", username);

      //dispatch je f-ja koja pokrece Redux akciju koja azurira Redux state userAuthSlice
      // tako aplikacija zna da je korisnik ulogovan
      dispatch(setLoggedInUser({username, password})); //azurira se stanje tj. userAuthSlice pomocu dispatch
      
      toastNotify(`Uspesna prijava! Dobrodosli, ${username}!`, "success");
      navigate("/products");
      onClose();
    } catch (error) {
      console.error("Greška prilikom prijave:", error);
      toastNotify("Pogresno korisnicko ime ili lozinka!", "error");
    }
  }
  //async f-ja uvek vraca Promise(objekat koji je rez. asinhrone operacije) -
  // nesto sto se nece desiti odmah vec u buducnosti
  // **ovde je vazno da vratim promise jer treba da sacekam da stigne rezultat
  // pre nego sto nastavim sa navigacijom, dispatchom, prikazom toastNotifikacije...

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex overflow-hidden"
      >
        {/*Levi deo */}
        <div className="bg-orange-500 text-white flex flex-col justify-center items-center p-8 w-[30%] min-w-[200px]">
          <h2 className="text-3xl font-bold mb-4">Dobrodošli!</h2>
          <p className="text-sm leading-relaxed">
            Prijavite se da biste nastavili korišćenje aplikacije i pristupili
            svim proizvodima.
          </p>
        </div>

        {/* Forma */}
        <div className="flex-1 p-8 relative flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-orange-600"
            aria-label="Zatvori modal"
          >
            <FaTimes size={24} />
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Prijava</h2>

          {/* kada se klikne na dugme Prijavi se, automatski se poziva f-ja handleSubmit
            to je moguce zato sto sam na dugme dodao tip submit
          */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 pr-12 w-full 
               focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white rounded py-2 font-semibold hover:bg-orange-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Prijava..." : "Prijavi se"}
            </button>
            {isError && (
              <p className="text-red-500 text-sm">Greska pri prijavi!</p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
