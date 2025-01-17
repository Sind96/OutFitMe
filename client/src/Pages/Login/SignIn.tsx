import styles from "./login.module.css"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from 'react-router-dom';
import { logIn } from "../../Services/authApiServices";
import { signInFailed, signInStart, signInSuccess } from "../../store/slices/userSlice";

export default function SignIn ({ getLocation }:any) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading , error} = useSelector((state: any) => state.user);

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
  <main className={styles.SignIn} >
     
    <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>OutFitMe</p>
        <p>Sign In</p>
      </div>


      <form onSubmit={handleSubmit} className={styles.flexForm} >
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signInForm.username}
          onChange={handleChange}
          required
          />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signInForm.password}
          onChange={handleChange}
          required
          />
        <button disabled={isLoading}>
            {isLoading ? 'Creating' : 'Sign In'} 
        </button>
      </form>

      <div className={styles.SignInExtra}>
        <p>{`Don't have an account?`}</p>
        <Link to={'/signup'}>
          <span className={styles.blueFont}>Sign up</span>
        </Link>
      </div>
      <p> {error ? error  || 'Something went wrong logging in...' : ''} </p>
  </main>
  );
}