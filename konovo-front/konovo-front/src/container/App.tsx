import { Route, Routes } from "react-router-dom";
import { Header } from "../components/layout/importsLayout";
import Footer from "../components/layout/Footer";
import MainPage from "../pages/MainPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import ProtectedRoute from "./ProtectedRoute";
import { Products, SpecificProduct } from "../components/Products/importsProducts";
import { Kontakt, UserProfile } from "../pages";

function App() {
  const dispatch = useDispatch();
  //const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUsername = localStorage.getItem("username");

    if (localToken && localUsername) {
      dispatch(setLoggedInUser({ username: localUsername, password: "" }));
    }
  }, []);

  return (
    <div>
      <Header />
      <main className="w-screen m-0 p-0 bg-[#fdfbf6]">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route 
            path="/products"
            /* ProtectedRoute omogucava zastitu ruta, tj ako korisnik nije prijavljen onemogucava mu se pristup toj ruti*/ 
            element={
              <ProtectedRoute> 
                <Products />
              </ProtectedRoute>}
            ></Route>
            <Route path="/product/:id" element={<SpecificProduct />}></Route>
            <Route path="/kontakt" element={<Kontakt />}></Route>
            <Route path="/userProfile" element={<UserProfile />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
