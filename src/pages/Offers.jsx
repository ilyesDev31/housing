import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListing } from "../features/listing/listingSlice";
import { useGetOffersQuery } from "../features/listing/listingApiSlice";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const Offers = () => {
  const listing = useSelector((state) => state.listing.listings);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetOffersQuery();
  useEffect(() => {
    const fetchData = async () => {
      if (error) {
        toast.error(error.data.message);
      }
      const res = await data;
      console.log(res);
      dispatch(getListing(res.offers));
    };
    fetchData();
  }, [data, error]);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
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
        <p>No listings for Offers</p>
      )}
    </div>
  );
};

export default Offers;
