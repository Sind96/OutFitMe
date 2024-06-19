import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { logOut } from '../../Services/authApiServices';
import { signOut } from '../../store/slices/userSlice';

const baseUrl = 'http://localhost:3000';

export default function Profile() {
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
    <div className=' bg-blue-50 h-screen' >
      <div className='p-3 max-w-lg mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>
          Profile
        </h1>
        <form className='flex flex-col gap-4' >
          <img
            src={currentUser.profilePicture}
            alt='Profile image'
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          />
          <input
            defaultValue={username}
            type='text'
            id='username'
            placeholder='Username'
            className='bg-white rounded-lg p-3'
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
          />
          <input
            defaultValue={email}
            type='email'
            id='email'
            placeholder='Email'
            className='bg-white rounded-lg p-3'
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </form>
        
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign out
          </span>
        </div>
        {/* Import ToastContainer at the end */}
        <ToastContainer />
      </div>
    </div>
  );
}