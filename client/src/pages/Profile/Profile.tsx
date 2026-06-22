import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar/Navbar";
import { deleteUser, updateUser } from "../../services/authService";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import { signOut, updateUserInfo } from "../../store/slices/userSlice";
import type { UpdateUserFormData } from "../../types/auth.types";
import styles from "./Profile.module.css";
import { ProfileProps } from "./Profile.types";

export default function Profile({ onMenuClick }: ProfileProps) {
  const { currentUser, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    setUsername(currentUser.username);
    setEmail(currentUser.email);
  }, [currentUser]);

  if (!currentUser || !token) {
    return null;
  }

  const handleUpdateUser = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const updates: UpdateUserFormData = {
      username,
      email,
    };

    try {
      await updateUser(currentUser._id, token, updates);
      dispatch(updateUserInfo(updates));
      toast.success("Your profile has been successfully updated.");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong updating your profile.";

      toast.error(errorMessage);
    }
  };

  const handleDeleteUser = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      await deleteUser(currentUser._id, token);
      dispatch(signOut());
      toast.success("Your account has been deleted.");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong deleting your account.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.ProfileContainer}>
      <h1 className={styles.ProfileHeader}>Profile</h1>

      <form className={styles.form}>
        <img
          src={currentUser.profilePicture}
          alt={`${currentUser.username}'s profile`}
        />

        <input
          value={username}
          type="text"
          id="username"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          value={email}
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </form>

      <div className={styles.buttonContainers}>
        <button className={styles.UpdateAccount} onClick={handleUpdateUser}>
          Update Account
        </button>
        <button className={styles.DeleteAccount} onClick={handleDeleteUser}>
          Delete Account
        </button>
      </div>

      <Navbar onMenuClick={onMenuClick} />
    </div>
  );
}
