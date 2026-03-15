import { useReducer } from "react";
import BookingForm from "../Components/BookingForm";
import MainLayout from "./MainLayout";
import "./BookingPage.scss";

export function initializeTimes() {
  return fetchAPI(new Date());
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return fetchAPI(new Date(action.date));
    case "RESERVE_TIME":
      return state.filter((time) => time !== action.time);
    default:
      return state;
  }
}

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <MainLayout>
      <h1>Reserve a table</h1>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </MainLayout>
  );
}