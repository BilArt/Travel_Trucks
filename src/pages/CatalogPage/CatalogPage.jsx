import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers());
    }
  }, [dispatch, status]);

  const handleFilterChange = (filter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredCampersList =
    campers?.items?.filter((camper) =>
      activeFilters.every((filter) => camper[filter] === true)
    ) || [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.catalog_container}>
      <CatalogFilter onFilterChange={handleFilterChange} />
      <div className={styles.cards_section}>
        {filteredCampersList.length > 0 ? (
          filteredCampersList.map((camper) => (
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
