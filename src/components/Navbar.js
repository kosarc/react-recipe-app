//styles
import "./Navbar.css";

//hooks
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useTheme } from "./hooks/useTheme";

export default function Navbar() {
  const { color, changeEdit } = useTheme();
  console.log(color);

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand" onClick={() => changeEdit(false)}>
          <h1>Ninja Recipe</h1>
        </Link>
        <Searchbar />
        <Link to="/create" onClick={() => changeEdit(false)}>
          Create Recipe
        </Link>
      </nav>
    </div>
  );
}
