import { useEffect } from "react";
import iconSprite from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log("Campers data:", campers);
  }, [campers]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const campersList = campers?.items || [];

  return (
    <div className={styles.catalog_container}>
      {/* Location and Filters */}
      <div className={styles.filter_section}>
        {/* Location */}
        <div className={styles.location}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <div className={styles.input_container}>
            <svg className={styles.icon}>
              <use xlinkHref={`${iconSprite}#icon-location`}></use>
            </svg>
            <input
              type="text"
              id="location"
              placeholder="Kyiv, Ukraine"
              className={styles.search_input}
            />
          </div>
        </div>

        {/* Filters */}
        <h3 className={styles.filters_title}>Filters</h3>

        {/* Vehicle equipment */}
        <div className={styles.filter_category}>
          <h4 className={styles.category_title}>Vehicle equipment</h4>
          <div className={styles.options}>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-ac`}></use>
              </svg>
              AC
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-transmission`}></use>
              </svg>
              Automatic
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-cup_hot`}></use>
              </svg>
              Kitchen
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-tv`}></use>
              </svg>
              TV
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-shower`}></use>
              </svg>
              Bathroom
            </button>
          </div>
        </div>

        {/* Vehicle type */}
        <div className={styles.filter_category}>
          <h4 className={styles.category_title}>Vehicle type</h4>
          <div className={styles.options}>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-grid_1_2`}></use>
              </svg>
              Van
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-grid_2_2`}></use>
              </svg>
              Fully Integrated
            </button>
            <button className={styles.option}>
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-grid_3_3`}></use>
              </svg>
              Alcove
            </button>
          </div>
        </div>

        {/* Search Button */}
        <div className={styles.search_button_container}>
          <button className={`${styles.search_button} primary_button`}>
            Search
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cards_section}>
        {campersList.length > 0 ? (
          campersList.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))
        ) : (
          <div>No campers found</div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
