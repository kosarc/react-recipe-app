//styles
import "./RecipeList.css";

//hooks
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";

//img
import TrashCan from "../components/assets/trash-can.svg";

//firestore
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function RecipeList({ recipes }) {
  const { mode, changeEdit } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes found...</div>;
  }

  const handleClick = async (id) => {
    try {
      await deleteDoc(doc(db, "recipe", id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <img
            src={TrashCan}
            alt="trash-can icon"
            className="trash-can"
            onClick={() => handleClick(recipe.id)}
            title="delete"
          />

          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`} onClick={() => changeEdit(false)}>
            Cook This
          </Link>
        </div>
      ))}
    </div>
  );
}
