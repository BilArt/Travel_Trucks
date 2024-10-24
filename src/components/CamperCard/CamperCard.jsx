import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  return (
    <div className={styles.card}>
      <img src={camper.image} alt={camper.name} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.name}>{camper.name}</h2>
        <p className={styles.price}>${camper.price.toLocaleString()}</p>
        <Link to={`/catalog/${camper.id}`} className={styles.link}>
          Show more
        </Link>
      </div>
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CamperCard;
