import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  const [filteredCampers, setFilteredCampers] = useState(campers?.items || []);

  const handleSearch = () => {
    const filteredList = campers?.items?.filter((camper) => {
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
    });

    setFilteredCampers(filteredList || []);
  };

  useEffect(() => {
    if (
      !activeFilters.equipment.length &&
      !activeFilters.vehicleType.length &&
      !activeFilters.location
    ) {
      setFilteredCampers(campers?.items || []);
    }
  }, [campers, activeFilters]);

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
        onSearch={handleSearch}
      />
      <div className={styles.cards_section}>
        {filteredCampers.length > 0 ? (
          filteredCampers.map((camper) => (
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
