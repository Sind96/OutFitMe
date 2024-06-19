import './Sidebar.css';
import {
  PiPants,
  PiTShirt,
  PiSneaker,
  PiHeartStraight,
  PiPlusCircle,
} from 'react-icons/pi';

import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { logOut } from '../../Services/authApiServices';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/slices/userSlice';
import { GiClothes } from "react-icons/gi";
import { useState } from 'react';
import { IoMdMore } from "react-icons/io";




interface SidebarProps {
  onMenuClick: Function,
}

function Sidebar({ onMenuClick }: SidebarProps) {

  const [hideClothesIcons, setHideClothesIcons] = useState(true);
  const [hideAdditonalIcons, sethideAdditionalIcons] = useState(true);


  const handlerClothesReveal = () => {
    setHideClothesIcons(!hideClothesIcons)
  }

  const handlerOptionsReveal = () => {
    sethideAdditionalIcons(!hideAdditonalIcons)
  }

  //TODO: Add functionality to see (1) galleries by item type (2) liked outfits
  const dispatch = useDispatch();


  
  const handleSignOut = async () => {
    try {
      await logOut();
      dispatch(signOut());

    } catch (error) {
      
      console.error('Unauthorized: Invalid session or token.');

    } finally {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    }
  };


  return (
    <>
      <div className="sidebar-nav">
        <button className="sidebar-icon" onClick={() => onMenuClick('')}>
        <Link to={'/home'} className="sidebar-icon" > <IoHomeOutline /> </Link>
        </button>
        
        <button className="sidebar-icon">
          <PiHeartStraight />
        </button>


        {!hideClothesIcons && (
          <div className='iconPopUps'>
        <button className="sidebar-icon" onClick={() => onMenuClick('top')}>
          <PiTShirt />
        </button>
        <button className="sidebar-icon" onClick={() => onMenuClick('bottom')}>
          <PiPants />
        </button>
        <button className="sidebar-icon" onClick={() => onMenuClick('shoe')}>
          <PiSneaker />
        </button>
          </div>
        )}


        <button className="sidebar-icon" onClick={handlerClothesReveal}>
          <GiClothes  />
        </button>


        {!hideAdditonalIcons && (
          <div className='iconPopUps2'>
        <Link to={'/profile'} className="sidebar-icon">
          <CgProfile />
        </Link>
        <button className="sidebar-icon" onClick={handleSignOut}> 
          <CiLogout /> 
        </button>
        </div>
        )}


        <button className="sidebar-icon" onClick={handlerOptionsReveal}>
          <IoMdMore />
        </button>

        
      </div>
    </>
  );
} 

export default Sidebar;
