// src/components/CamperCard/CamperCard.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import iconSprite from "../../assets/icons.svg";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const maxDescriptionLength = 60;
  const maxNameLength = 22;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const featuresList = [
    { name: "AC", icon: "ac", available: camper.AC },
    {
      name: "Automatic",
      icon: "transmission",
      available: camper.transmission === "automatic",
    },
    { name: "Kitchen", icon: "cup_hot", available: camper.kitchen },
    { name: "TV", icon: "tv", available: camper.TV },
    { name: "Bathroom", icon: "shower", available: camper.bathroom },
    { name: "Petrol", icon: "petrol", available: camper.engine === "petrol" },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.image_placeholder}>
        <img src={camper.gallery[0]?.thumb} alt={camper.name} />
      </div>
      <div className={styles.details}>
        <div className={styles.name_and_price_favorite}>
          <h2 className={styles.name}>
            {truncateText(camper.name, maxNameLength)}
          </h2>
          <div className={styles.price_and_favorite}>
            <p className={styles.price}>
              €{camper.price ? camper.price.toFixed(2) : "N/A"}
            </p>
            <svg className={styles.favorite_icon}>
              <use xlinkHref={`${iconSprite}#icon-heart`}></use>
            </svg>
          </div>
        </div>

        <div className={styles.rating_and_location}>
          <span className={styles.rating}>
            <svg
              className={styles.star_icon}
              style={{
                fill:
                  camper.reviews && camper.reviews.length > 0
                    ? "#ffc531"
                    : "currentColor",
              }}
            >
              <use xlinkHref={`${iconSprite}#icon-rating_star`}></use>
            </svg>
            {camper.rating} ({camper.reviews ? camper.reviews.length : 0}{" "}
            Reviews)
          </span>
          <span className={styles.location}>
            <svg className={styles.location_icon}>
              <use xlinkHref={`${iconSprite}#icon-location`}></use>
            </svg>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>
          {truncateText(camper.description, maxDescriptionLength)}
        </p>

        <div className={styles.features}>
          {featuresList
            .filter((feature) => feature.available)
            .map((feature, index) => (
              <div key={index} className={styles.feature}>
                <svg className={styles.feature_icon}>
                  <use xlinkHref={`${iconSprite}#icon-${feature.icon}`}></use>
                </svg>
                {feature.name}
              </div>
            ))}
        </div>
        <Link
          to={`/catalog/${camper.id}`}
          className={`primary_button ${styles.show_more_button}`}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    rating: PropTypes.number,
    location: PropTypes.string,
    description: PropTypes.string,
    AC: PropTypes.bool,
    kitchen: PropTypes.bool,
    bathroom: PropTypes.bool,
    TV: PropTypes.bool,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        thumb: PropTypes.string,
        original: PropTypes.string,
      })
    ),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string,
        reviewer_rating: PropTypes.number,
        comment: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default CamperCard;
