import "./Sidebar.css";
import { PiPants, PiTShirt, PiSneaker, PiHeartStraight } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { logOut } from "../../services/authService";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../store/slices/userSlice";
import { GiClothes } from "react-icons/gi";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import type { SidebarProps } from "./Sidebar.types";

function Sidebar({ onMenuClick }: SidebarProps) {
  const [showClothingMenu, setShowClothingMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleClothingMenu = () => {
    if (!showClothingMenu) {
      setShowOptionsMenu(false);
    }

    setShowClothingMenu(!showClothingMenu);
  };

  const toggleOptionsMenu = () => {
    if (!showOptionsMenu) {
      setShowClothingMenu(false);
    }

    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      dispatch(signOut());
    } catch (error) {
      console.error("Unauthorized: Invalid session or token.");
    } finally {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  };

  const handleGalleryClick = (itemType: string) => {
    onMenuClick(itemType);
    setShowClothingMenu(false);
    navigate("/home");
  };

  return (
    <div className="sidebar-nav">
      <Link to="/home" className="sidebar-icon" onClick={() => onMenuClick("")}>
        <IoHomeOutline />
      </Link>

      <button className="sidebar-icon">
        <PiHeartStraight />
      </button>

      <div className="menuWrapper">
        <button className="sidebar-icon" onClick={toggleClothingMenu}>
          <GiClothes />
        </button>

        {showClothingMenu && (
          <div className="iconPopUps">
            <button
              className="sidebar-icon"
              onClick={() => handleGalleryClick("top")}
            >
              <PiTShirt />
            </button>

            <button
              className="sidebar-icon"
              onClick={() => handleGalleryClick("bottom")}
            >
              <PiPants />
            </button>

            <button
              className="sidebar-icon"
              onClick={() => handleGalleryClick("shoe")}
            >
              <PiSneaker />
            </button>
          </div>
        )}
      </div>

      <div className="menuWrapper">
        <button className="sidebar-icon" onClick={toggleOptionsMenu}>
          <IoMdMore />
        </button>

        {showOptionsMenu && (
          <div className="iconPopUps2">
            <Link to={"/profile"} className="sidebar-icon">
              <CgProfile />
            </Link>

            <button className="sidebar-icon" onClick={handleSignOut}>
              <CiLogout />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
