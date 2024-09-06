import React from "react";
import "./Card.css";

const Card = ({car}) => {
  return (
    <div className="card">
      <img className="card-image" src={car.imageUrl || "https://dummyimage.com/300x225/000/fff"} alt="blog" />
      <div className="card-content">
        <h2 className="card-title">{car.carName}</h2>
        <p className="card-description">{car.km} km | {car.fuel} | {car.cityName}</p>
        <p className="card-price">{car.price}</p>
        <p className="card-make-offer">Make Offer</p>
        <div className="card-footer">
          <a className="btn">Get Seller Details</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
