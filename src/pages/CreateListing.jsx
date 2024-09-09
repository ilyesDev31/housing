/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAddListingMutation } from "../features/listing/listingApiSlice";
import axios from "axios";
import { toast } from "react-toastify";
const CreateListing = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const [files, setFiles] = useState([]);
  const [inputData, setInputData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {
    name,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
  } = inputData;
  const [addListing, { isLoading }] = useAddListingMutation();

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addListing({ inputData, files }).unwrap();
      toast.success("Listing Saved");
      navigate(`/category/${inputData.type}`);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };
  const onMutate = (e) => {
    setInputData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  // isLoading && <Spinner />;
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              name="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              name="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <label htmlFor="name" className="formLabel">
            Name
          </label>
          <input
            className="formInputName"
            placeholder="Listing Name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />
          <div className="formRooms flex">
            <div>
              <label htmlFor="bedrooms" className="formLabel">
                Bedrooms
              </label>
              <input
                type="Number"
                className="formInputSmall"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                name="bedrooms"
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="formLabel">
                Bathrooms
              </label>
              <input
                type="Number"
                className="formInputSmall"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                name="bathrooms"
                min="1"
                max="50"
                required
              />
            </div>
          </div>
          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              type="button"
              className={parking == "true" ? "formButtonActive" : "formButton"}
              onClick={onMutate}
              value="true"
              name="parking"
            >
              Yes
            </button>
            <button
              type="button"
              className={
                !parking || (parking == "false" && parking !== null)
                  ? "formButtonActive"
                  : "formButton"
              }
              value="false"
              name="parking"
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              type="button"
              className={
                furnished == "true" ? "formButtonActive" : "formButton"
              }
              onClick={onMutate}
              value="true"
              name="furnished"
            >
              Yes
            </button>
            <button
              type="button"
              className={
                !furnished || (furnished == "false" && furnished !== null)
                  ? "formButtonActive"
                  : "formButton"
              }
              value="false"
              name="furnished"
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            placeholder="Address"
            name="address"
            value={address}
            id="address"
            onChange={onMutate}
            required
          />
          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer === "true" ? "formButtonActive" : "formButton"}
              type="button"
              value="true"
              name="offer"
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer || (offer === "false" && offer !== null)
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              value="false"
              onClick={onMutate}
              name="offer"
            >
              No
            </button>
          </div>
          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              type="number"
              className="formInputSmall"
              name="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>
          {JSON.parse(offer) && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                type="number"
                className="formInputSmall"
                name="discountedPrice"
                onChange={onMutate}
                value={discountedPrice}
                min="50"
                max="750000000"
                required={JSON.parse(offer)}
              />
            </>
          )}
          <label className="formLabel">Images</label>
          <p className="imageInfo">
            The first image will be the cover (max 3).
          </p>
          <input
            className="formInputFile"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            max="4"
            required
            name="files"
          />
          <button className="primaryButton createListingButton" type="submit">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
