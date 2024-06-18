import styles from "./login.module.css"

export default function SignUp () {

  return (
  <div className={styles.SignUpContainer}>

<form className={styles.flexForm}>
  <input type="text" placeholder="Username"/>
  <input type="text" placeholder="Email"/> 
  <input type="password" placeholder="Password"/> 
  <input type="password" placeholder="Confirm Password"/>
  <button type="submit">Sign Up</button>
</form>

<div className={styles.SignInExtra}>
  <p>Already have an account?<span className={styles.redFont}> Login</span></p>
</div>
</div>
  );
}