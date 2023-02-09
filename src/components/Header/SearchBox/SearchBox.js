import "./SearchBox.scss";
import { useState } from "react";

import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function SearchBox(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="search-box">
      <div className="search-box__header">
        <input
          onChange={(event) => setSearchText(event.target.value)}
          type="text"
          placeholder="Find place"
          value={searchText}
        />
        <button
          className="search__button"
          onClick={() => {
            const params = {
              q: searchText,
              format: "json",
              addressdetails: 1,
              polygon_geojson: 0,
            };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            };

            searchText.length > 0 &&
              fetch(NOMINATIM_BASE_URL + queryString, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                  setSearchResults(data);
                });
          }}
        >
          <HiOutlineSearch size={24} />
        </button>
      </div>

      {searchResults.length === 0 ? (
        <div className="search-box__noresult"></div>
      ) : (
        <div className="search-box__table">
          <div className="search-box__results">
            {searchResults.map((result) => (
              <div
                className="search-box__item"
                key={result.osm_id}
                onClick={() => {
                  props.onSearchSelect(result);
                  setSearchResults([]);
                  setSearchText("");
                }}
              >
                <HiOutlineLocationMarker size={24} />
                <div className="search-box__result__name">
                  {result.display_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
