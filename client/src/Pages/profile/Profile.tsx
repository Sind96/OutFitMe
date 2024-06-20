import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styles from "./index.module.css";

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import { signOut } from '../../store/slices/userSlice';
import Sidebar from '../../Components/Sidebar/Sidebar';

const baseUrl = 'http://localhost:3000';


export default function Profile({ onMenuClick }) {

  const { currentUser } = useSelector(state => state.user);
  const { token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  // const [password, setPassword] = useState('');

 
  const handleDeleteUser = async () => {
    
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
        <Sidebar onMenuClick={onMenuClick} />
        <ToastContainer />
    </div>
  );
}