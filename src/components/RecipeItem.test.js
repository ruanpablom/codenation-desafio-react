import React from "react";
import { mount } from "enzyme";
import RecipeItem from "./RecipeItem";

const props = {
  recipe: {
    title: "Onion Chicken in Balsamic Sauce",
    href:
      "http://allrecipes.com/Recipe/Onion-Chicken-in-Balsamic-Sauce/Detail.aspx",
    ingredients:
      "balsamic vinegar, chicken, chicken broth, garlic, olive oil, onions, salt, sun dried tomato",
    thumbnail: "http://img.recipepuppy.com/17.jpg"
  }
};

describe("RecipeItem", () => {
  test("Should be RecipeItem", () => {
    const wrapper = mount(<RecipeItem {...props} />);
    expect(wrapper.is("RecipeItem")).toBeTruthy();
  });

  // Add more tests here
});
