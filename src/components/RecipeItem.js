import React from "react";
import parse from "html-react-parser";

const RecipeItem = ({ recipe }) => (
  <div className="col-sm-3 mt-4">
    <div className="card">
      <img className="card-img-top img-fluid" src={recipe.thumbnail} alt="" />
      <div className="card-body">
        <h5 className="card-title">{parse(recipe.title)}</h5>
        <p className="card-text">
          <strong>Ingredients: </strong>
          {parse(recipe.ingredients)}
        </p>
      </div>
    </div>
  </div>
);

export default RecipeItem;
