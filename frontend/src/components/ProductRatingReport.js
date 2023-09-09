import axios from "axios";
import React, { useState, useEffect } from "react";

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
        setDistinctItemNames([
          ...new Set(res.data.map((item) => item.title_orig)),
        ]);
        console.log(distinctItemNames);
      })
      .catch((error) => {
        console.error("Error fetching rating", error);
      });

    // Filter items based on the search term
    setDistinctItemNames(
      distinctItemNames.filter((itemName) =>
        itemName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // setFilteredItems(filtered);
  }, []);

  //get the average rating
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

  //writting a function to change the row colour based on the rates
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
    <div className="container">
      <center>
        <h1>Product Rating Report</h1>
      </center>

      <div>
        <input
          type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            {distinctItemNames.map((itemName) => (
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
