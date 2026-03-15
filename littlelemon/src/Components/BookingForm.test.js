import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "./BookingPage";

// Mock fetchAPI globalement
beforeEach(() => {
  global.fetchAPI = jest.fn((date) => ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]);
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();
const availableTimes = ["17:00", "18:00", "19:00", "20:00"];

const renderForm = () =>
  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={mockDispatch}
      submitForm={mockSubmitForm}
    />
  );

// ============================================
// initializeTimes & updateTimes
// ============================================

describe("initializeTimes", () => {
  test("returns a non-empty array of available times", () => {
    const times = initializeTimes();
    expect(times).toBeDefined();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test("calls fetchAPI with today's date", () => {
    initializeTimes();
    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  });
});

describe("updateTimes", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00"];

  test("returns new times when UPDATE_TIMES is dispatched with a date", () => {
    const action = { type: "UPDATE_TIMES", date: "2024-01-15" };
    const result = updateTimes(initialState, action);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(global.fetchAPI).toHaveBeenCalledWith(new Date("2024-01-15"));
  });

  test("removes reserved time when RESERVE_TIME is dispatched", () => {
    const action = { type: "RESERVE_TIME", time: "17:00" };
    const result = updateTimes(initialState, action);
    expect(result).not.toContain("17:00");
    expect(result).toContain("18:00");
  });

  test("returns current state for unknown action", () => {
    const action = { type: "UNKNOWN" };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(initialState);
  });
});

// ============================================
// HTML5 validation attributes
// ============================================

describe("HTML5 validation attributes", () => {
  test("Full Name has required and minLength attributes", () => {
    renderForm();
    const input = screen.getByLabelText(/full name/i);
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("minLength", "2");
  });

  test("Date has required and min attributes", () => {
    renderForm();
    const input = screen.getByLabelText(/choose date/i);
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("min");
  });

  test("Time has required attribute", () => {
    renderForm();
    const select = screen.getByLabelText(/choose time/i);
    expect(select).toHaveAttribute("required");
  });

  test("Guests has required, min and max attributes", () => {
    renderForm();
    const input = screen.getByLabelText(/number of guests/i);
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("min", "1");
    expect(input).toHaveAttribute("max", "10");
  });
});

// ============================================
// Submit button disabled state
// ============================================

describe("Submit button disabled state", () => {
  test("submit button is disabled when form is empty", () => {
    renderForm();
    const button = screen.getByDisplayValue(/make your reservation/i);
    expect(button).toBeDisabled();
  });

  test("submit button is enabled when all fields are valid", () => {
    renderForm();

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const futureDate = today.toISOString().split("T")[0];

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { name: "FullName", value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { name: "date", value: futureDate },
    });
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { name: "time", value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { name: "guests", value: 2 },
    });

    const button = screen.getByDisplayValue(/make your reservation/i);
    expect(button).not.toBeDisabled();
  });
});

// ============================================
// Full Name validation
// ============================================

describe("Full Name validation", () => {
  test("shows error when name is empty", () => {
  renderForm();
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { name: "FullName", value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { name: "FullName", value: "" },
  });
  expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
});

  test("shows error when name is less than 2 characters", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { name: "FullName", value: "A" },
    });
    expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument();
  });

  test("no error when name is valid", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { name: "FullName", value: "John Doe" },
    });
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
  });
});

// ============================================
// Date validation
// ============================================

describe("Date validation", () => {
  test("shows error when date is in the past", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { name: "date", value: "2020-01-01" },
    });
    expect(screen.getByText(/cannot be in the past/i)).toBeInTheDocument();
  });

  test("no error when date is today or future", () => {
    renderForm();
    const today = new Date().toISOString().split("T")[0];
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { name: "date", value: today },
    });
    expect(screen.queryByText(/cannot be in the past/i)).not.toBeInTheDocument();
  });
});

// ============================================
// Guests validation
// ============================================

describe("Guests validation", () => {
  test("shows error when guests is less than 1", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { name: "guests", value: 0 },
    });
    expect(screen.getByText(/at least 1 guest/i)).toBeInTheDocument();
  });

  test("shows error when guests exceeds 10", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { name: "guests", value: 11 },
    });
    expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
  });

  test("no error when guests is between 1 and 10", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { name: "guests", value: 5 },
    });
    expect(screen.queryByText(/at least 1 guest/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/maximum 10 guests/i)).not.toBeInTheDocument();
  });
});

// ============================================
// Form submission
// ============================================

describe("Form submission", () => {
  test("submitForm is called with form data when form is valid", () => {
    renderForm();

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const futureDate = today.toISOString().split("T")[0];

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { name: "FullName", value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { name: "date", value: futureDate },
    });
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { name: "time", value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { name: "guests", value: 2 },
    });

    fireEvent.click(screen.getByDisplayValue(/make your reservation/i));
    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  });

  test("submitForm is not called when form is invalid", () => {
    renderForm();
    fireEvent.click(screen.getByDisplayValue(/make your reservation/i));
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });
});