import React, { Component } from "react";
import Navbar from "./Navbar";
import RecipeItem from "./RecipeItem";
import recipes from "../sample_data/recipes.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ""
    };
  }
  handleSetSearchString = value => {
    this.setState({ searchString: value });
  };
  handleFilterWithMark = arrayToFilter => {
    //functions used in this method
    function addMarkTag(stringToaddMark, startPosition, endPosition) {
      let newString =
        stringToaddMark.slice(0, endPosition) +
        `</mark>` +
        stringToaddMark.slice(endPosition);

      newString =
        newString.slice(0, startPosition) +
        `<mark>` +
        newString.slice(startPosition);

      return newString;
    }
    function addMarks(stringToAddMarks, wordToMark) {
      let newString = stringToAddMarks;

      const markTagSize = 13; // 13 is equal to "<mark></mark>".length;
      let stringToFilter = stringToAddMarks; //this string will be sliced until all marks be added
      let slicedStringSize = 0;
      let qtdMarksAdded = 0;
      let marksSize = 0;
      let markStartPos = 0;
      let markEndPos = 0;
      while (stringToFilter !== "") {
        marksSize = qtdMarksAdded * markTagSize;
        markStartPos = stringToFilter
          .toLowerCase()
          .search(wordToMark.toLowerCase());
        if (markStartPos !== -1) {
          markEndPos = markStartPos + wordToMark.length;
          newString = addMarkTag(
            newString,
            slicedStringSize + marksSize + markStartPos,
            slicedStringSize + marksSize + markEndPos
          );
          qtdMarksAdded++;
          stringToFilter = stringToFilter.slice(markEndPos);
          slicedStringSize += markEndPos; //size of string sliced from stringToFilter
        } else {
          stringToFilter = "";
        }
      }

      return newString;
    }
    //end of functions

    const { searchString } = this.state;
    let arrayFiltered = [];

    if (searchString === "") return arrayToFilter;

    //Filtering array
    let conditionTitle = false;
    let conditionIngredients = false;
    for (let i = 0; i < arrayToFilter.length; i++) {
      conditionTitle =
        arrayToFilter[i].title
          .toLowerCase()
          .search(searchString.toLowerCase()) !== -1;
      conditionIngredients =
        arrayToFilter[i].ingredients
          .toLowerCase()
          .search(searchString.toLowerCase()) !== -1;

      if (conditionTitle || conditionIngredients) {
        let elementFiltered = JSON.parse(JSON.stringify(arrayToFilter[i])); //deep copy
        if (conditionTitle) {
          elementFiltered.title = addMarks(elementFiltered.title, searchString);
        }
        if (conditionIngredients) {
          elementFiltered.ingredients = addMarks(
            elementFiltered.ingredients,
            searchString
          );
        }
        arrayFiltered.push(elementFiltered);
      }
    }
    return arrayFiltered;
  };
  render() {
    const filteredRecipes = this.handleFilterWithMark(this.recipes);
    return (
      <div className="App">
        <Navbar onSetSearchString={this.handleSetSearchString} />
        <div className="container mt-10">
          <div className="row">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <RecipeItem key={index} recipe={recipe} />
              ))
            ) : (
              <div className="justify-content-center col-12 my-4">
                <h1>No Results to show</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
