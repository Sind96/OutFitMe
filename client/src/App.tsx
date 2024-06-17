import './App.css';
import { useState, useEffect } from 'react';
// import Sidebar from './Components/Sidebar/Sidebar';
// import DisplayContainer from './Components/DisplayContainer/DisplayContainer';
// import LoginPage from './Components/LoginPage/LoginPage';
// import Gallery from './Components/Gallery/Gallery';
import SignIn from './Pages/Login/signIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  //TODO: Style the page where user accepts to give their location first, have that accept button get weather and random outfit
  // to avoid having to click two buttons

  
  //GALLERIES
  const [itemType, setItemType] = useState<string>('');
  const [gallery, setGallery] = useState<string>('');

  ////////////////////////////////////////////////////////////////////////////

  //GALLERIES
  const onMenuClick = async (itemType: string) => {
    setItemType(itemType);
    setGallery(itemType);
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignIn />}  />
    </Routes>
    </BrowserRouter>
       {/* {!clicked ? (
        <LoginPage
          getLocation={getLocation}
          name={name}
          handleName={handleName}
        />
      ) : (

          <div className="display-container">
            {!gallery ? (
              <DisplayContainer
                weatherData={weatherData}
                emoji={emoji}
                name={name}
              />
            ) : (
              <div className="app-container gallery"> 
              <Gallery itemType={itemType} />
              </div>
            )}
          <div className="app-container">
            <Sidebar onMenuClick={onMenuClick} />
          </div>
         </div>
      )} */}
     </>
  );
}
export default App;
