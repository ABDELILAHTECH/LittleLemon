import { render, screen } from "@testing-library/react";
import { initializeTimes, updateTimes } from "./BookingPage";

// Mock fetchAPI globalement
beforeEach(() => {
global.fetchAPI = jest.fn((date) => ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]);});

afterEach(() => {
  jest.clearAllMocks();
});

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