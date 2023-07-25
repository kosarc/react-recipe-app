//hooks
import { useRef, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useParams } from "react-router-dom";

//Firestore
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

//styles
import "./EditRecipe.css";

//img
import Remove from "../components/assets/remove.svg";

const EditRecipe = (prop) => {
  const [title, setTitle] = useState(prop.title);
  const [method, setMethod] = useState(prop.method);
  const [cookingTime, setCookingTime] = useState(prop.cookingTime);
  const [newIngradient, setNewIngradient] = useState("");
  const [ingredients, setIngradients] = useState([...prop.ingredients]);

  console.log(cookingTime);

  const { id } = useParams();

  const { mode, changeEdit } = useTheme();

  const ingradietnFocus = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    let ing = newIngradient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngradients((prevIng) => [...prevIng, ing]);
    }
    ingradietnFocus.current.focus();
    setNewIngradient("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const docs = {
      title,
      ingredients,
      method,
      cookingTime: `${cookingTime} minutes`,
    };

    const editDoc = async () => {
      try {
        await setDoc(doc(db, "recipe", id), docs);
        changeEdit(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    editDoc();
  };

  return (
    <div className={`edit-recipe ${mode}`}>
      <h2 className="page-title">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title</span>
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Recipe ingradients</span>
          <div className="ingradients">
            <input
              type="text"
              onChange={(e) => setNewIngradient(e.target.value)}
              value={newIngradient}
              ref={ingradietnFocus}
            />

            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
          <p>
            Ingradients:{" "}
            {ingredients.map((i) => (
              <em key={i}>
                {" "}
                {i}{" "}
                <img
                  src={Remove}
                  alt="remove-icon"
                  onClick={() =>
                    setIngradients((prevIng) =>
                      prevIng.filter((ing) => ing !== i)
                    )
                  }
                />
              </em>
            ))}
          </p>
        </label>
        <label>
          <span>Recipe method</span>
          <textarea
            required
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          />
        </label>

        <label>
          <span>Cooking time(minutes)</span>
          <input
            type="number"
            required
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime.match(/\d+/)}
          />
        </label>
        <button className="btn">Edit recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
