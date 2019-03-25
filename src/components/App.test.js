import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App", () => {
  test("Should be App", () => {
    const wrapper = mount(<App />);
    expect(wrapper.is("App")).toBeTruthy();
  });

  // Add more tests here
  test("Should have mark", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ searchString: "gi" });
    expect(wrapper.exists("mark")).toBeTruthy();
  });
  test("Should not have mark", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ searchString: "" });
    expect(wrapper.exists("mark")).toBeFalsy();
  });
});
