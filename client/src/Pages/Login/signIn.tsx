import styles from "./login.module.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from 'react-router-dom';
import { logIn } from "../../Services/authApiServices";
import { signInFailed, signInStart, signInSuccess } from "../../store/slices/userSlice";

export default function SignIn ({ getLocation }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);

  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value
    })  
  }  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLocation()
    dispatch(signInStart())
    try {
      const userData = await logIn(signInForm);
      dispatch(signInSuccess(userData));
      navigate('/home');
    } catch (error) {
      console.log("this is the error",error)
      const errorMessage = error || "An error occurred. Please try again."
      dispatch(signInFailed(errorMessage));

    }
    setSignInForm({
      username: '',
      password: ''
  })

  }  


  return (
  <main className="bg-blue-50 h-screen">
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 "
        >
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signInForm.username}
          className="bg-white p-3 rounded-lg"
          onChange={handleChange}
          required
          />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={signInForm.password}
          className="bg-white p-3 rounded-lg"
          onChange={handleChange}
          required
          />
        <button
          disabled={user.isLoading}
          className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-60">
            {user.isLoading ? 'Creating' : 'SIGN IN'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>{`Don't have an account?`}</p>
        <Link to={'/signup'}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"> {user.error ? user.error  || 'something went wrong' : ''} </p>
    </div>
  </main>
  );
}