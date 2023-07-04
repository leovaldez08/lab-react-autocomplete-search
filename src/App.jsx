import { useState, useEffect } from "react";
import jsonData from "./Data/countryData.json";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleAutocompleteSearch = (value) => {
    setSearchTerm(value);

    const filteredResults = jsonData.filter(
      (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    setFilteredData(filteredResults);
  };

  const handleSelect = (item) => {
    setSearchTerm(item.name);
    setFilteredData([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setFilteredData([]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleAutocompleteSearch(e.target.value)}
          placeholder="Enter your search term"
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "200px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        {filteredData.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              marginTop: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
              position: "absolute",
              zIndex: "1",
              width: "200px",
            }}
          >
            {filteredData.map((item) => (
              <li
                key={item.code}
                onClick={() => handleSelect(item)}
                style={{ padding: "8px", cursor: "pointer" }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
