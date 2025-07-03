import { Route, Routes } from "react-router-dom";
import { Header } from "../components/layout";
import Footer from "../components/layout/Footer";
import MainPage from "../pages/MainPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import ProtectedRoute from "./ProtectedRoute";
import { Products, SpecificProduct } from "../components/Products";

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
      <main className="w-screen m-0 p-0">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>}
            ></Route>
            <Route path="/product/:id" element={<SpecificProduct />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
