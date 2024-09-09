import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFetchSingleListingQuery } from "../features/listing/listingApiSlice";
import { useGetListingOwnerQuery } from "../features/user/userApiSlice";
import { getSingleListing } from "../features/listing/listingSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getListingOwner } from "../features/user/authSlice";
const Contact = () => {
  const [message, setMessage] = useState("");
  const { landlordId } = useParams();
  const listing = useSelector((state) => state.listing.singleListing);
  const landlord = useSelector((state) => state.user.listingOwner);
  const dispatch = useDispatch();
  const obj1 = useFetchSingleListingQuery(landlordId);
  const obj2 = useGetListingOwnerQuery(landlordId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.all([obj1.data, obj2.data]);
        console.log(res);
        dispatch(getSingleListing(res[0].data));
        dispatch(getListingOwner(res[1].user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [obj1.data, obj1.error, obj2.data, obj2.error, dispatch]);
  {
    obj1.isLoading || (obj2.isLoading && <Spinner />);
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>

        {landlord !== null && (
          <main>
            <div className="contactLandlord">
              <p className="landlordName">Contact {landlord?.name} </p>
            </div>
            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="textarea"
                  placeholder="Write Your Message Here!"
                ></textarea>
              </div>
              <a
                href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
              >
                <button type="button" className="primaryButton">
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </header>
    </div>
  );
};

export default Contact;
