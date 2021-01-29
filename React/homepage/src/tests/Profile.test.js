import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Profile from "../components/Profile";
import AppContextProvider from "../contexts/AppContextProvider";

beforeEach(() => {
  render(
    <AppContextProvider>
      <Profile />
    </AppContextProvider>
  );
});
afterEach(() => cleanup());

describe("Profile.js", () => {
  it("should show all contents", () => {
    expect(screen.getByTestId("ProfileAll")).toBeInTheDocument();
  });
});
it("should make pagination work correctly", () => {
  userEvent.click(screen.getByRole("button", { name: "Go to next page" }));
  expect(screen.getByRole("button", { name: "page 2" }));
});
