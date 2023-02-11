import "./SearchBox.scss";
import { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/base";

import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";

function SearchBox(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchHandler() {
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
  }

  // get current location

  function getLocationHandler() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        async function getCityName() {
          const params = {
            lat: location.lat,
            lon: location.lon,
            zoom: 10,
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

          const response = await fetch(
            NOMINATIM_REVERSE_URL + queryString,
            requestOptions
          );
          const data = await response.json();
          return data;
        }

        getCityName().then((data) => {
          props.onSearchSelect(data);
        });
       
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // useEffect for enter key press

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        searchHandler();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [searchText]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (searchResults) {
          setSearchResults([]);
          setSearchText("");
        }
      }}
    >
      <div className="search-box">
        <div className="search-box__header">
          <input
            onChange={(event) => setSearchText(event.target.value)}
            type="text"
            placeholder="Find place"
            value={searchText}
          />
          <button className="search__button" onClick={getLocationHandler}>
            <HiOutlineLocationMarker size={24} />
          </button>
          <button className="search__button" onClick={searchHandler}>
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
    </ClickAwayListener>
  );
}

export default SearchBox;
