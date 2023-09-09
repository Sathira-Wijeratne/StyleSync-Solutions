import axios from "axios";
import React, { useState, useEffect } from "react";

function ProductRatingReport() {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/rating/`)
      .then((res) => {
        console.log(res.data);
        setRating(res.data);
      })
      .catch((error) => {
        console.error("Error fetching rating", error);
      });
  }, []);

  return (
    <div>
      <h1>Rating Report</h1>
      <ul>
        {rating.map((rating) => (
          <li key={rating._id}>
            Item Name: {rating.title_orig}, Rating: {rating.noOfRate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductRatingReport;
