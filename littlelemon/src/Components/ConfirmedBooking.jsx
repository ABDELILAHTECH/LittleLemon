import { Link } from "react-router-dom";
import "./ConfirmedBooking.scss";

export default function ConfirmedBooking() {
  return (
    <div className="confirmed-booking">
      <h1>Booking Confirmed! 🎉</h1>
      <p>Thank you! Your reservation has been successfully confirmed.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}