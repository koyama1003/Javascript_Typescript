import { render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Main from "../components/Main";

afterEach(() => {
  cleanup();
});

describe("Main.js", () => {
  it("should show all contents except title", async () => {
    await act(async () => render(<Main />));
    const All = screen.getByTestId("MainAll");
    expect(All).toBeTruthy();
  });
  it.todo("Reducer test");
});
describe("Snapshot", () => {
  it("should preserve all contents", () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
