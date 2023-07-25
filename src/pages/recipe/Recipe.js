//styles
import "./Recipe.css";

//hooks
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../components/hooks/useTheme";
import { useState, useEffect } from "react";

//components
import EditRecipe from "../../components/EditRecipe";

//Firestore
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

//img
import Trashcan from "../../components/assets/trash-can.svg";
import Edit from "../../components/assets/edit.svg";

const Recipe = () => {
  const { id } = useParams();
  const { mode, changeEdit, edit } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [err, setErr] = useState(null);

  let navigate = useNavigate();

  const handleClick = async () => {
    try {
      await deleteDoc(doc(db, "recipe", id));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    changeEdit(true);
  };

  useEffect(() => {
    setIsPending(true);
    setErr(null);
    const unsub = onSnapshot(
      doc(db, "recipe", id),
      (doc) => {
        if (doc.exists()) {
          setIsPending(false);
          setRecipe(doc.data());
        }
      },
      (error) => {
        setIsPending(false);
        setErr("Could not find that recipe");
        console.log(error.message);
      }
    );

    return () => unsub();
  }, [id]);

  if (edit && recipe) {
    return (
      <div className={`recipe ${mode}`}>
        <EditRecipe
          title={recipe.title}
          method={recipe.method}
          cookingTime={recipe.cookingTime}
          ingredients={recipe.ingredients}
        />
      </div>
    );
  }

  if (!edit) {
    return (
      <div className={`recipe ${mode}`}>
        {isPending && <div className="loading">Loading...</div>}
        {err && <div className="error">{err}</div>}
        {recipe && (
          <>
            <div className="icons">
              <img
                src={Trashcan}
                alt="trash-can icon"
                className="trash-can"
                onClick={handleClick}
                title="delete"
              />
              <img
                src={Edit}
                alt="edit icon"
                className="edit"
                onClick={handleEdit}
                title="edit"
              />
            </div>
            <h2 className="page-title">{recipe.title}</h2>
            <p>Takes {recipe.cookingTime} to cook</p>
            <ul>
              {recipe.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <p className="method">{recipe.method}</p>
          </>
        )}
      </div>
    );
  }
};

export default Recipe;
