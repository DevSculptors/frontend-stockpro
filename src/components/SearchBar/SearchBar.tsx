import React, { useState, ChangeEvent } from "react";

import styles from "./style.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  name : string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, name}) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        Buscar Producto
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
      <button className={styles.buttonCreate} onClick={handleSearch}>
        Buscar
      </button>
      
    </div>
  );
};

export default SearchBar;
