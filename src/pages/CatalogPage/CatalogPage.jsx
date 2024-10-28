import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);
  const [activeFilters, setActiveFilters] = useState({
    equipment: [],
    vehicleType: [],
    location: "",
  });
  const [visibleCount, setVisibleCount] = useState(4); // Отображаем 4 карточки изначально

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers());
    }
  }, [dispatch, status]);

  const handleFilterChange = (filterType, filterValue) => {
    setActiveFilters((prevFilters) => {
      const isFilterActive = prevFilters[filterType].includes(filterValue);
      const updatedFilters = isFilterActive
        ? prevFilters[filterType].filter((item) => item !== filterValue)
        : [...prevFilters[filterType], filterValue];

      return {
        ...prevFilters,
        [filterType]: updatedFilters,
      };
    });
  };

  const handleLocationChange = (location) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      location,
    }));
  };

  const isActiveFilter = (filterType, filterValue) => {
    return activeFilters[filterType].includes(filterValue);
  };

  const filteredCampersList =
    campers?.items?.filter((camper) => {
      const matchesEquipment = activeFilters.equipment.every((filter) => {
        if (filter === "transmission") {
          return camper.transmission === "automatic";
        }
        return camper[filter] === true;
      });

      const matchesVehicleType =
        !activeFilters.vehicleType.length ||
        activeFilters.vehicleType.some(
          (filter) => filter.toLowerCase() === camper.form.toLowerCase()
        );

      const matchesLocation =
        !activeFilters.location ||
        camper.location
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase());

      return matchesEquipment && matchesVehicleType && matchesLocation;
    }) || [];

  const loadMoreCards = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Увеличиваем количество видимых карточек на 4
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.catalog_container}>
      <CatalogFilter
        onFilterChange={handleFilterChange}
        onLocationChange={handleLocationChange}
        isActiveFilter={isActiveFilter}
        activeFilters={activeFilters}
      />

      <div className={styles.cards_section}>
        {filteredCampersList.slice(0, visibleCount).map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
        {visibleCount < filteredCampersList.length && (
          <button
            onClick={loadMoreCards}
            className={`${styles.load_more_button}`}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
