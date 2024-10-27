import styles from "./HomePage.module.css";
import heroImage from "../../assets/HomePage/hero.jpg";

const HomePage = () => {
  return (
    <div
      className={styles.homepage_container}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className={styles.title}>Campers of your dreams</h1>
      <p className={styles.text}>
        You can find everything you want in our catalog
      </p>
      <button className={`${styles.btn} primary_button`}>View Now</button>
    </div>
  );
};

export default HomePage;
