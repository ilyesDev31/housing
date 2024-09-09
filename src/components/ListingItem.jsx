/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteIcon from "../assets/svg/deleteIcon.svg?react";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
const ListingItem = ({ item, onDelete }) => {
  return (
    <li id={item.id} className="categoryListing">
      <Link
        to={`/category/${item.type}/${item._id}`}
        className="categoryListingLink"
      >
        <img
          src={`../../../backend/public/${item.imageUrls[0]}`}
          alt={item.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{item.location}</p>
          <p className="categoryListingName"> {item.name} </p>
          <p className="categoryListingPrice">
            {" "}
            ${" "}
            {item.offer
              ? item.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : item.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {item.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {item.bedrooms > 1 ? `${item.bedrooms} Bedrooms` : "1 Bedroom"}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {item.bath > 1 ? `${item.bath} Bathrooms` : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(item.id, item.name)}
        />
      )}
    </li>
  );
};

export default ListingItem;
