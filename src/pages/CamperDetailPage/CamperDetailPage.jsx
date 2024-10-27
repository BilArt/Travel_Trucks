import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCamperById } from "../../redux/campersSlice";
import styles from "./CamperDetailPage.module.css";
import iconSprite from "../../assets/icons.svg";

const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { camper, status, error } = useSelector((state) => state.campers);

  useEffect(() => {
    console.log("Fetching camper with ID:", id);
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Camper data in component:", camper);
  }, [camper]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!camper) return <div>No camper data found</div>;

  const hasReviews = camper.reviews && camper.reviews.length > 0;

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.rating_location}>
          <span className={styles.rating}>
            <svg
              className={`${styles.star_icon} ${
                hasReviews ? styles.star_icon_yellow : ""
              }`}
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
        <p className={styles.price}>
          €{camper.price ? camper.price.toFixed(2) : "N/A"}
        </p>
      </div>

      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Camper view ${index + 1}`}
            className={styles.gallery_image}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <h2 className={styles.section_title}>Features</h2>
        <h2 className={styles.section_title}>Reviews</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.features_section}>
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

          <div className={styles.details}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>
            <p>
              <strong>Form:</strong> {camper.form}
            </p>
            <p>
              <strong>Length:</strong> {camper.length}
            </p>
            <p>
              <strong>Width:</strong> {camper.width}
            </p>
            <p>
              <strong>Height:</strong> {camper.height}
            </p>
            <p>
              <strong>Tank:</strong> {camper.tank}
            </p>
            <p>
              <strong>Consumption:</strong> {camper.consumption}
            </p>
          </div>
        </div>

        <div className={styles.booking_section}>
          <h2 className={styles.sectionTitle}>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
          <form className={styles.bookingForm}>
            <label>Name*</label>
            <input type="text" required />
            <label>Email*</label>
            <input type="email" required />
            <label>Booking date*</label>
            <input type="date" required />
            <label>Comment</label>
            <textarea rows="3"></textarea>
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailPage;
