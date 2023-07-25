//styles
import "./Searchbar.css";

//hooks
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
    </div>
  );
}
