import { useState, useEffect } from "react";
import "./BookingForm.scss";

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [form, setForm] = useState({
    FullName: "",
    date: "",
    time: "",
    guests: 1,
    Occasion: "None",
  });

  // ✅ Met à jour time automatiquement quand availableTimes change
  useEffect(() => {
    if (availableTimes.length > 0) {
      setForm((prev) => ({ ...prev, time: availableTimes[0] }));
    }
    console.log("availabletimes",availableTimes)
  }, [availableTimes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "date") {
      dispatch({ type: "UPDATE_TIMES", date: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(form); 
  };
  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label htmlFor="fullname">Full Name</label>
      <input
        type="text"
        id="fullname"
        name="FullName"
        value={form.FullName}
        onChange={handleChange}
      />

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        value={form.time}
        onChange={handleChange}
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        min="1"
        max="10"
        value={form.guests}
        onChange={handleChange}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="Occasion"
        value={form.Occasion}
        onChange={handleChange}
      >
        <option value="None">None</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input
        type="submit"
        value="Make Your Reservation"
        disabled={!form.FullName || !form.date || !form.time}
      />
    </form>
  );
}