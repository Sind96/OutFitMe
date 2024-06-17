import styles from "./login.module.css"

export default function SignIn () {

  return (
  <div className={styles.SignInContainer}>

<form className={styles.flexForm}>
        <input type="text" placeholder="email@domain.com"/> 
        <input type="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>

      <div className={styles.SignInExtra}>
        <p>First time?<span className={styles.redFont} > Sign up now!</span></p>
      </div>
      </div>
  );
}