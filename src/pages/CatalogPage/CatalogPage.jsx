import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import styles from "./CatalogPage.module.css";
import debounce from "lodash.debounce";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { campers, status, error } = useSelector((state) => state.campers);
  const [activeFilters, setActiveFilters] = useState({
    equipment: [],
    vehicleType: [],
    location: "",
  });

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

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedFilters,
      };

      return newFilters;
    });
  };

  const handleLocationChange = (location) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      location,
    }));
  };

  const debouncedLocationChange = useCallback(
    debounce(handleLocationChange, 300),
    []
  );

  const handleLocationInputChange = (location) => {
    debouncedLocationChange(location);
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
        onLocationChange={handleLocationInputChange}
        isActiveFilter={isActiveFilter}
        activeFilters={activeFilters}
      />

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
