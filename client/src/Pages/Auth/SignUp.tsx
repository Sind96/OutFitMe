import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../Services/authApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import {
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "../../store/slices/userSlice";
import type { SignUpFormData } from "../../Types/auth.types";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const [signUpForm, setSignUpForm] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signUpStart());

    try {
      await signUp(signUpForm);
      dispatch(signUpSuccess());
      toast.success("Account created successfully", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      dispatch(signUpFailed(errorMessage));
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    setSignUpForm({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <main className={styles.SignIn}>
      <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>OutFitMe</p>
        <p>Sign Up</p>
      </div>

      <form className={styles.flexForm} onSubmit={handleSubmit}>
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

        <button disabled={isLoading}>
          {isLoading ? "Creating... " : "SIGN UP"}
        </button>
      </form>

      <div className={styles.SignInExtra2}>
        <p>Have an account?</p>
        <Link to={"/"}>
          <span>Sign in</span>
        </Link>
      </div>
      {error && <p>{error}</p>}
      <ToastContainer />
    </main>
  );
}
