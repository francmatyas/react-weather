import "./SearchBox.scss";
import { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/base";

import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";

class Location {
  constructor(location, lat, lon) {
    this.details = location;
    this.lat = lat;
    this.lon = lon;
  }

  getLocationName() {
    const country = this.details.address.country;
    if (this.details.address.city) {
      return `${this.details.address.city}, ${country}`;
    } else if (this.details.address.town) {
      return `${this.details.address.town}, ${country}`;
    } else if (this.details.address.village) {
      return `${this.details.address.village}, ${country}`;
    } else if (this.details.address.hamlet) {
      return `${this.details.address.hamlet}, ${country}`;
    } else if (this.details.address.administrative) {
      return `${this.details.address.administrative}, ${country}`;
    }

    return this.details.display_name;
  }
}

function SearchBox(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // fetch search results from nominatim api
  // https://nominatim.org/release-docs/develop/api/Search/

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

  // get current location and fetch city name from nominatim api
  // https://nominatim.org/release-docs/develop/api/Reverse/

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
          const location = new Location(data, location.lat, location.lon);
          props.onSearchSelect(location);
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
      <div id="search-box">
        <div id="search-box__header">
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
          <div id="search-box__noresult"></div>
        ) : (
          <div id="search-box__table">
            <div id="search-box__results">
              {searchResults.map((result) => (
                <div
                  className="search-box__item"
                  key={result.osm_id}
                  onClick={() => {
                    const location = new Location(
                      result,
                      result.lat,
                      result.lon
                    );
                    props.onSearchSelect(location);
                    setSearchResults([]);
                    setSearchText("");
                  }}
                >
                  <HiOutlineLocationMarker size={24} />
                  <span id="search-box__result__name">
                    {result.display_name}
                  </span>
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
