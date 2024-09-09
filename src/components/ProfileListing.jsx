import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

  const listing = useSelector((state) => state.listing.userListings);
  console.log(listing);
  return <div>ProfileListing</div>;
};

export default ProfileListing;
