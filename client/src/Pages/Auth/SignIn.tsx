import styles from "./Auth.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../Services/authApiServices";
import type { LoginFormData } from "../../Types/auth.types";
import {
  signInFailed,
  signInStart,
  signInSuccess,
} from "../../store/slices/userSlice";
import { SignInProps } from "./Auth.types";

export default function SignIn({ getLocation }: SignInProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.user);

  const [signInForm, setSignInForm] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({
      ...signInForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getLocation();
    dispatch(signInStart());

    try {
      const userData = await logIn(signInForm);

      dispatch(signInSuccess(userData));
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";

      dispatch(signInFailed(errorMessage));
    }

    setSignInForm({
      username: "",
      password: "",
    });
  };

  return (
    <main className={styles.SignIn}>
      <div className={styles.TopHeader}>
        <p id={styles.LargeText1}>OutFitMe</p>
        <p>Sign In</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.flexForm}>
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
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className={styles.SignInExtra}>
        <p>{`Don't have an account?`}</p>
        <Link to="/signup">
          <span className={styles.blueFont}>Sign up</span>
        </Link>
      </div>

      {error && <p>{error}</p>}
    </main>
  );
}
