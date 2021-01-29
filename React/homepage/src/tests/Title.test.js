import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "../components/Title";

describe("Title.js", () => {
  beforeEach(() => {
    render(<Title />);
  });
  afterEach(() => {
    cleanup();
  });
  it("should show all contents", () => {
    expect(screen.getByTestId("TitleAll")).toBeTruthy();
  });
  it("should render avatar", () => {
    const avatar = screen.getByAltText("My Portfolio");
    expect(avatar).toBeInTheDocument();
  });
});
