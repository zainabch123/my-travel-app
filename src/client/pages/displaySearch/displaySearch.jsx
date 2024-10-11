import { useContext } from "react";
import { AppContext } from "../../App.jsx";

import "./displaySearch.css";

const DisplaySearch = () => {
  const { tripData, setTripData } = useContext(AppContext);

  console.log("trip Data in display Search", tripData);
  
  return (
    <div className="search-page">
      <div className="display-data-wrapper">
        <ul className="data-cards">
          {tripData.map((data, index) => {
            return (
              <li key={index} className="data-card">
                <div className="card-content">
                  <img src={data.images[0].images.original.url} alt="Data Image" />
                  <h2>{data.name}</h2>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DisplaySearch;
