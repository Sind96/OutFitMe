import React from 'react'
import { useSelector } from 'react-redux'
import DisplayContainer from '../../Components/DisplayContainer/DisplayContainer'
import Gallery from '../../Components/Gallery/Gallery'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { GiConsoleController } from 'react-icons/gi'


export default function Home({ gallery, weatherData, emoji, onMenuClick, itemType}) {

  const {currentUser} = useSelector((state: any) => state.user);


  return (
    <div className="display-container">
      {!gallery ? (
        <DisplayContainer
          weatherData={weatherData}
          emoji={emoji}
          name={currentUser.username}
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

   
  )
}


