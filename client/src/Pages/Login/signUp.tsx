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
    <main className="bg-blue-50 h-screen">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7"> Register </h1>
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 "
          >
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={signUpForm.username}
            className="bg-white p-3 rounded-lg"
            onChange={handleChange}
            required
            />
          <input 
            type="text" 
            placeholder="email" 
            name="email" 
            value={signUpForm.email}
            className="bg-white p-3 rounded-lg"
            onChange={handleChange}
            required
            />
          <input 
            type="password" 
            placeholder="password" 
            name="password" 
            value={signUpForm.password}
            className="bg-white p-3 rounded-lg"
            onChange={handleChange}
            required
          />
        
          <button 
            disabled={isLoading} 
            className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
              {isLoading ? 'Creating... ' : 'SIGN UP'}
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={'/'}>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5"> {error && 'something went wrong'} </p>
        <ToastContainer />  
      </div>
    </main>
  )
}