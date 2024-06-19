import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styles from "./index.module.css";

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { logOut } from '../../Services/authApiServices';
import { signOut } from '../../store/slices/userSlice';
import Sidebar from '../../Components/Sidebar/Sidebar';

const baseUrl = 'http://localhost:3000';


export default function Profile({ onMenuClick }) {
  const { currentUser } = useSelector(state => state.user);
  const { token } = useSelector(state => state.user);
  
  const accessToken = token;
  const dispatch = useDispatch();

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  // const [password, setPassword] = useState('');

  const handleSignOut = async () => {
    try {
      await logOut();
      dispatch(signOut());

    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Invalid session or token.');
      } else {
        console.error('Error signing out:', error);
      }
    } finally {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    }
  };
 
  const handleDeleteUser = async () => {
    try {
      // Delete user on the backend (replace with your actual API call)
      const response = await fetch(`${baseUrl}/auth/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: ` ${accessToken}`, 
        
        },
      }
    );

      if (!response.ok) {
        throw new Error(await response.text() || 'Delete failed');
      }

      dispatch(signOut()); // Dispatch sign out after successful deletion
      localStorage.removeItem('accessToken');
      window.location.href = '/'; // Redirect to sign-in

    } catch (error) {
      console.error('Error deleting user:', error);
    } 
  };

  return (
    <div className={styles.ProfileContainer} >

        <h1 className={styles.ProfileHeader}>Profile</h1>

        <form className={styles.form}>
          <img
            src={currentUser.profilePicture}
            alt='Profile Image'
          />
          <input
            defaultValue={username}
            type='text'
            id='username'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
          />
          {/* <input
            defaultValue={password}
            type='password'
            id='password'
            placeholder='Password'
            onChange={(e) => setEmail(e.target.value)} // Update password state on change
          /> */}
          <input
            defaultValue={email}
            type='email'
            id='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </form>
        
        <div className={styles.buttonContainers}>
          <button className={styles.UpdateAccount}> Update Account</button>
          <button className={styles.DeleteAccount} onClick={handleDeleteUser}>Delete Account</button>
        </div>
        {/* Import ToastContainer at the end */}
        <Sidebar onMenuClick={onMenuClick} />
        <ToastContainer />
    </div>
  );
}