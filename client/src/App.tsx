import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Favourites from "./pages/Favourites/Favourites";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useWeather } from "./hooks/useWeather";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [itemType, setItemType] = useState<string>("");
  const { weatherData, emoji, getLocation } = useWeather();

  const onMenuClick = (itemType: string) => {
    setItemType(itemType);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn getLocation={getLocation} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={
              <Home
                weatherData={weatherData}
                emoji={emoji}
                onMenuClick={onMenuClick}
                itemType={itemType}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile onMenuClick={onMenuClick} />}
          />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={4000} />
    </BrowserRouter>
  );
}
export default App;
