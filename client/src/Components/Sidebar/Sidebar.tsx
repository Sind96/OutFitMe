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




interface SidebarProps {
  onMenuClick: Function,
}

function Sidebar({ onMenuClick }: SidebarProps) {
  //TODO: Add functionality to see (1) galleries by item type (2) liked outfits



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

        
      </div>
    </>
  );
}

export default Sidebar;
