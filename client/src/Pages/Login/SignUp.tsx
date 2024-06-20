import styles from "./login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { signUp } from "../../Services/authApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpFailed, signUpStart, signUpSuccess } from "../../store/slices/userSlice";



export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: any) => state.user);

  const [signUpForm, setSignUpForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUpStart());  
    
    try {
      dispatch(signUpSuccess())
      await signUp(signUpForm);
      toast.success('Account created successfully', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      navigate('/')
      
    } catch (error) {
      dispatch(signUpFailed())
      toast.error('Something went wrong. Please try again', {
        position: "top-center",
        autoClose:  4000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    setSignUpForm({
        username: '',
        email: '',
        password: '',
    })
  }

  return (
    <main className={styles.SignIn}>
        
        <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>OutFitMe</p>
        <p>Sign Up</p>
      </div>

        <form className={styles.flexForm}
          onSubmit={handleSubmit} 
          >
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={signUpForm.username}
            onChange={handleChange}
            required
            />
          <input 
            type="text" 
            placeholder="Email" 
            name="email" 
            value={signUpForm.email}
            onChange={handleChange}
            required
            />
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={signUpForm.password}
            onChange={handleChange}
            required
          />
        
          <button 
            disabled={isLoading} >
              {isLoading ? 'Creating... ' : 'SIGN UP'}
          </button>
        </form>

        <div className={styles.SignInExtra2}>
          <p>Have an account?</p>
          <Link to={'/'}>
            <span>Sign in</span>
          </Link>
        </div>
        <p> {error && 'something went wrong'} </p>
        <ToastContainer />  
    </main>
  )
}