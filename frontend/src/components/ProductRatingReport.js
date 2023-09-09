import React, { useState, useEffect } from "react";

function ProductRatingReport() {
    const [rating,setRating]= useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8070/rating/`).then((response)=>response.json()).then((response)=>response.json()).then((data)=>{
            setRating(data);
        }).catch((error)=>{
            console.error("Error fetching rating",error);
        });

},[]);

return(
    <div>
        <h1>
            Rating Report 
        </h1>
        <ul>
        {
            rating.map((rating)=>(
                <li key={rating._id}>
                    Item Name: {rating.title_orig}, Rating: {rating.noOfRate}
                </li>
            ))
        }
        </ul>

    </div>
);
}

export default ProductRatingReport;