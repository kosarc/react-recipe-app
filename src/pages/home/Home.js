//styles
import "./Home.css";

//hooks

import RecipeList from "../../components/RecipeList";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useTheme } from "../../components/hooks/useTheme";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);
    const unsub = onSnapshot(
      collection(db, "recipe"),
      (snapshot) => {
        if (snapshot.empty) {
          setErr("No recipes to load");
          setIsPending(false);
        }

        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(results);
        setIsPending(false);
      },
      (error) => {
        isPending(false);
        setErr("Could not fecth the data");
        console.log(error.message);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {isPending && <div className={mode}>Loading...</div>}
      {err && <div>{err}</div>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;
