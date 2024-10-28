import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.booking_section}>
      <h2 className={`${styles.section_title} ${styles.form_title}`}>
        Book your campervan now
      </h2>
      <p className={styles.form_text}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={styles.booking_form}>
        <input type="text" placeholder="Name*" required />
        <input type="email" placeholder="Email*" required />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="dd.mm.yyyy"
          className={`${styles.input} ${styles.date_input}`}
        />
        <textarea
          placeholder="Comment"
          rows="3"
          style={{ resize: "none" }}
        ></textarea>
        <button
          type="submit"
          className={`${styles.submit_button} primary_button`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
