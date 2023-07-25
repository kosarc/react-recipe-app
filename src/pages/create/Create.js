//hooks
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//Firestore
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

//styles
import "./Create.css";
import { useTheme } from "../../components/hooks/useTheme";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngradient, setNewIngradient] = useState("");
  const [ingredients, setIngradients] = useState([]);
  let navigate = useNavigate();

  const { mode } = useTheme();

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

    const addData = async () => {
      try {
        await addDoc(collection(db, "recipe"), docs);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
    addData();
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>
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
              <em key={i}> {i}</em>
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
            value={cookingTime}
          />
        </label>
        <button className="btn">Add recipe</button>
      </form>
    </div>
  );
};

export default Create;
