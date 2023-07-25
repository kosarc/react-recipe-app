//styles
import "./Search.css";

//hooks
import { useLocation } from "react-router-dom";
import { useFetch } from "../../components/hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { useTheme } from "../../components/hooks/useTheme";

const Search = () => {
  const { mode } = useTheme();

  const queryString = useLocation().search;
  const queryParam = new URLSearchParams(queryString);
  let query = queryParam.get("q");

  let url = `http://localhost:8000/recipes?q=${query}`;

  const { data: recipe, err, isPending } = useFetch(url);

  return (
    <div className={`search ${mode}`}>
      <h2 className="page-title">Recipes with "{query}"</h2>
      {isPending && <div className="loading">Loading...</div>}
      {err && <div className="error"></div>}
      {recipe && <RecipeList recipes={recipe} />}
    </div>
  );
};

export default Search;
