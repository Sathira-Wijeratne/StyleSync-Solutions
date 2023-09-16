import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function ProductRatingReport() {
  const [rating, setRating] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [distinctItemNames, setDistinctItemNames] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/rating/`)
      .then((res) => {
        console.log(res.data);
        setRating(res.data);
        setAvgRatings(getAverageRatings(res.data));
        // Extract distinct item names using Set
        const distinctNames = [...new Set(res.data.map((item) => item.title_orig))];
        console.log(distinctNames);
        setDistinctItemNames(distinctNames);
      })
      .catch((error) => {
        console.error("Error fetching rating", error);
      });
  }, []);

  // Function to filter items based on search term and number of rates
  useEffect(() => {
    const filteredItems = distinctItemNames.filter((itemName) => {
      const lowerItemName = itemName.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      // Filter by item name and number of rates (change 'minRate' as needed)
      const minRate = 3; // Example: Filter items with a minimum rate of 3

      return lowerItemName.includes(lowerSearchTerm) && avgRatings[itemName] >= minRate;
    });

    setFilteredItems(filteredItems);
  }, [searchTerm, avgRatings, distinctItemNames]);

  // Function to get the average rating
  function getAverageRatings(arr) {
    console.log(arr);
    const itemMap = new Map();
    const result = {};

    arr.forEach((obj) => {
      if (!itemMap.has(obj.title_orig)) {
        itemMap.set(obj.title_orig, [obj.noOfRate]);
      } else {
        itemMap.get(obj.title_orig).push(obj.noOfRate);
      }
    });

    itemMap.forEach((value, key) => {
      const sum = value.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / value.length;
      result[key] = avg;
    });

    return result;
  }

  // Function to change the row color based on the rates
  const getRowClass = (noOfRate) => {
    if (noOfRate === 5) {
      return `table-success`;
    } else if (noOfRate === 4) {
      return `table-warning`;
    } else if (noOfRate === 3) {
      return `bg-warning`;
    } else if (noOfRate === 2) {
      return `table-danger`;
    } else if (noOfRate === 1) {
      return `bg-danger`;
    }
  };

  return (
    <div className="container" align="Center">
      <center>
        <h1>Product Rating Report</h1>
      </center>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        &nbsp;<FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      <center>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>
                <center>No. of Rates</center>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((itemName) => (
              <tr key={itemName} className={getRowClass(avgRatings[itemName])}>
                <td>{itemName}</td>
                <td>
                  <center>{avgRatings[itemName]}</center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default ProductRatingReport;
