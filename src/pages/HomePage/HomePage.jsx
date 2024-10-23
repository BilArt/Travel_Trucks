import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.homepage_container}>
      <h1 className={styles.title}>Campers of your dreams</h1>
      <p className={styles.text}>You can find everything you want in our catalog</p>
      <button className={styles.btn}>View Now</button>
    </div>
  );
};

export default HomePage;
