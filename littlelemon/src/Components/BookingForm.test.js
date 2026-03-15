import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "./BookingPage"

describe("BookingForm and reducer tests", () => {

  // --- Test 1: texte statique dans BookingForm ---
  test("renders BookingForm label 'Full Name'", () => {
    render(<BookingForm availableTimes={[]} dispatch={() => {}} />);
    const labelElement = screen.getByLabelText("Full Name");
    expect(labelElement).toBeInTheDocument();
  });

  // --- Test 2: initializeTimes ---
  test("initializeTimes returns correct array of times", () => {
    const times = initializeTimes();
    expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
  });

  // --- Test 3: updateTimes ---
  test("updateTimes returns same state for unknown action", () => {
    const state = ["17:00", "18:00"];
    const newState = updateTimes(state, { type: "UNKNOWN" });
    expect(newState).toEqual(state);
  });
  
}); 
