import styles from "./login.module.css";
import LogoLogin from "./LogoLogin";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.loginContainer}>
      <LogoLogin />
      {children}
    </section>
  );
}

export default LoginLayout;
