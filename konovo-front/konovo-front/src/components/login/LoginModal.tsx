import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FaTimes } from "react-icons/fa";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Prijava:");

    onClose();
  }

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
            svim funkcijama.
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded py-2 font-semibold hover:bg-orange-600 transition"
            >
              Prijavi se
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
