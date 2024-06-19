import './Sidebar.css';
import {
  PiPants,
  PiTShirt,
  PiSneaker,
  PiHeartStraight,
  PiPlusCircle,
} from 'react-icons/pi';

import { IoHomeOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { logOut } from '../../Services/authApiServices';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/slices/userSlice';



interface SidebarProps {
  onMenuClick: Function,
}

function Sidebar({ onMenuClick }: SidebarProps) {
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
        <IoHomeOutline />
        </button>
        <button className="sidebar-icon" onClick={() => onMenuClick('top')}>
          <PiTShirt />
        </button>
        <button className="sidebar-icon" onClick={() => onMenuClick('bottom')}>
          <PiPants />
        </button>
        <button className="sidebar-icon" onClick={() => onMenuClick('shoe')}>
          <PiSneaker />
        </button>
        <button className="sidebar-icon">
          <PiHeartStraight />
        </button>
        {/* <Link to={'/profile'} className="sidebar-icon">
          <CgProfile />
        </Link> */}
        <button onClick={handleSignOut} className="sidebar-icon">
          <CiLogout />
        </button>

        
      </div>
    </>
  );
}

export default Sidebar;
