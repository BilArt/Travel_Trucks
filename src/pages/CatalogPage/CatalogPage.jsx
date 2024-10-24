import { useEffect } from "react";
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const campersList = Array.isArray(campers) ? campers : [];

  return (
    <div className={styles.catalog_container}>
      <div className={styles.filter_section}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <input
          type="text"
          placeholder="Search by location"
          className={styles.search_input}
        />

        {/*/////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
         HERE NEED TO ADD FILTERS!!!!
        /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////// */}
      </div>
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
