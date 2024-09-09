/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllListingsQuery } from "../features/listing/listingApiSlice";
import { useParams } from "react-router-dom";
import { getListing } from "../features/listing/listingSlice";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { toast } from "react-toastify";
const Category = () => {
  const listing = useSelector((state) => state.listing.listings);
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { data, error, isLoading } = useGetAllListingsQuery(categoryName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lists = await data.listings;
        dispatch(getListing(lists));
      } catch (error) {}
    };
    fetchData();
  }, [data]);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === "rent" ? "Places for rent" : "Places for sale"}
        </p>
      </header>
      {isLoading && <Spinner />}
      {listing && listing.length !== 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((a) => (
                <ListingItem key={a._id} item={a} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {categoryName}</p>
      )}
    </div>
  );
};

export default Category;
