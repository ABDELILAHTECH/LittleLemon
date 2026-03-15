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

  const [errors, setErrors] = useState({});

  // Met à jour time quand availableTimes change
  useEffect(() => {
    if (availableTimes.length > 0) {
      setForm((prev) => ({ ...prev, time: availableTimes[0] }));
    }
  }, [availableTimes]);

  // Validation React
  const validate = (name, value) => {
    switch (name) {
      case "FullName":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";

      case "date":
        if (!value) return "Please select a date.";
        if (new Date(value) < new Date(new Date().toDateString()))
          return "Date cannot be in the past.";
        return "";

      case "time":
        if (!value) return "Please select a time.";
        return "";

      case "guests":
        if (value < 1) return "At least 1 guest is required.";
        if (value > 10) return "Maximum 10 guests allowed.";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Validation en temps réel
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));

    if (name === "date") {
      dispatch({ type: "UPDATE_TIMES", date: value });
    }
  };

  const isFormValid = () => {
    return (
      form.FullName.trim().length >= 2 &&
      form.date !== "" &&
      new Date(form.date) >= new Date(new Date().toDateString()) &&
      form.time !== "" &&
      form.guests >= 1 &&
      form.guests <= 10
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      submitForm(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form" noValidate>

      <label htmlFor="fullname">Full Name</label>
      <input
        type="text"
        id="fullname"
        name="FullName"
        value={form.FullName}
        onChange={handleChange}
        required
        minLength={2}
        placeholder="Enter your full name"
      />
      {errors.FullName && <span className="error">{errors.FullName}</span>}

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        min={new Date().toISOString().split("T")[0]}
      />
      {errors.date && <span className="error">{errors.date}</span>}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      {errors.time && <span className="error">{errors.time}</span>}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        min="1"
        max="10"
        value={form.guests}
        onChange={handleChange}
        required
      />
      {errors.guests && <span className="error">{errors.guests}</span>}

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
        disabled={!isFormValid()}
      />

    </form>
  );
}