import PropTypes from "prop-types";
import styles from "./CatalogFilter.module.css";
import iconSprite from "../../assets/icons.svg";

const CatalogFilter = ({ onFilterChange, onLocationChange }) => {
  const equipmentFilters = [
    { label: "AC", icon: "ac", value: "AC" },
    { label: "Automatic", icon: "transmission", value: "transmission" },
    { label: "Kitchen", icon: "cup_hot", value: "kitchen" },
    { label: "TV", icon: "tv", value: "TV" },
    { label: "Bathroom", icon: "shower", value: "bathroom" },
  ];

  const vehicleTypeFilters = [
    { label: "Van", icon: "grid_1_2", value: "van" },
    { label: "Fully Integrated", icon: "grid_2_2", value: "integrated" },
    { label: "Alcove", icon: "grid_3_3", value: "alcove" },
  ];

  return (
    <div className={styles.filter_section}>
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
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
      </div>

      <h3 className={styles.filters_title}>Filters</h3>
      <div className={styles.filter_category}>
        <h4 className={styles.category_title}>Vehicle Equipment</h4>
        <div className={styles.options}>
          {equipmentFilters.map((filter) => (
            <button
              key={filter.value}
              className={styles.option}
              onClick={() => onFilterChange(filter.value)}
            >
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-${filter.icon}`}></use>
              </svg>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filter_category}>
        <h4 className={styles.category_title}>Vehicle Type</h4>
        <div className={styles.options}>
          {vehicleTypeFilters.map((filter) => (
            <button
              key={filter.value}
              className={styles.option}
              onClick={() => onFilterChange(filter.value)}
            >
              <svg className={styles.option_icon}>
                <use xlinkHref={`${iconSprite}#icon-${filter.icon}`}></use>
              </svg>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.search_button_container}>
        <button className={`${styles.search_button} primary_button`}>
          Search
        </button>
      </div>
    </div>
  );
};

CatalogFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default CatalogFilter;
